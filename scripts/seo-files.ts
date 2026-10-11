// Writes robots.txt and sitemap.xml into the build output. Runs automatically after `npm run build`.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { defaultLanguage, languagePaths, languages } from '../src/app/core/i18n/language.ts';
import { pageUrl, siteUrl } from '../src/app/core/seo/site.ts';

const outDir = join(import.meta.dirname, '..', 'dist', 'portfolio', 'browser');
const today = new Date().toISOString().slice(0, 10);

const alternates = [
  ...languages.map((lang) => ({ hreflang: lang, href: pageUrl(languagePaths[lang]) })),
  { hreflang: 'x-default', href: pageUrl(languagePaths[defaultLanguage]) },
]
  .map(
    ({ hreflang, href }) =>
      `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`,
  )
  .join('\n');

const urls = languages
  .map(
    (lang) => `  <url>
    <loc>${pageUrl(languagePaths[lang])}</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`,
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(join(outDir, 'sitemap.xml'), sitemap);
writeFileSync(join(outDir, 'robots.txt'), robots);

console.log('Generated sitemap.xml and robots.txt');
