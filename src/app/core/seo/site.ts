/**
 * Public address of the site, without a trailing slash.
 * Used for canonical and hreflang links, Open Graph tags, structured data and the sitemap.
 */
export const siteUrl = 'https://nenadjevtic.dev';

/** Social preview image in /public, 1200 × 630. */
export const ogImage = {
  path: '/og-image.png',
  width: 1200,
  height: 630,
};

/**
 * Full URL of a page as static hosts serve it. Prerendered pages live in folders
 * (sr/index.html), so their address ends with a slash.
 */
export function pageUrl(path: string): string {
  const withSlash = path.endsWith('/') ? path : `${path}/`;
  return new URL(withSlash, siteUrl).href;
}
