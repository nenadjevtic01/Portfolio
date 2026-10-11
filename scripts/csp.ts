// Adds a Content-Security-Policy <meta> tag to every prerendered page. Inline scripts (the theme
// script and the ones Angular adds for hydration) are allowed by their SHA-256 hash, so no
// 'unsafe-inline' is needed for scripts. Runs automatically after `npm run build`.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = join(import.meta.dirname, '..', 'dist', 'portfolio', 'browser');

// Scripts with these types are data, not code, and are not subject to script-src.
const dataTypes = ['application/json', 'application/ld+json'];

function inlineScriptHashes(html: string): string[] {
  const hashes = new Set<string>();

  for (const [, attributes, content] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const type = /\btype="([^"]*)"/i.exec(attributes)?.[1];
    if (/\bsrc=/i.test(attributes) || (type && dataTypes.includes(type)) || !content.trim()) {
      continue;
    }
    hashes.add(`'sha256-${createHash('sha256').update(content).digest('base64')}'`);
  }

  return [...hashes];
}

function policy(scriptHashes: string[]): string {
  return [
    "default-src 'self'",
    `script-src 'self' ${scriptHashes.join(' ')}`.trim(),
    // Angular renders component styles into <style> tags.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
}

const pages = readdirSync(outDir, { recursive: true, encoding: 'utf8' })
  .filter((file) => file.endsWith('.html'))
  .map((file) => join(outDir, file));

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const charset = /<meta charset="utf-8"\s*\/?>/i.exec(html);

  if (!charset) {
    throw new Error(`No <meta charset> found in ${page}`);
  }

  const meta = `<meta http-equiv="Content-Security-Policy" content="${policy(inlineScriptHashes(html))}">`;
  const end = charset.index + charset[0].length;
  writeFileSync(page, html.slice(0, end) + meta + html.slice(end));
}

console.log(`Added Content-Security-Policy to ${pages.length} pages`);
