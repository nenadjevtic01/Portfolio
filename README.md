# Portfolio

My personal portfolio website, built with Angular and prerendered to static HTML. Available in
English (`/`) and Serbian (`/sr`).

## Tech stack

- Angular 22 (standalone components, signals, built-in control flow)
- Static prerendering with `@angular/ssr`, one page per language
- Lightweight signal-based i18n without extra dependencies
- SCSS with CSS custom properties for light and dark themes
- Self-hosted fonts (Inter, JetBrains Mono) via Fontsource
- Vitest for unit tests

## Getting started

```bash
npm install
npm start
```

The site runs on `http://localhost:4200/`.

## Scripts

| Command          | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `npm start`      | Start the dev server                                 |
| `npm run build`  | Build, prerender and add sitemap, robots.txt and CSP |
| `npm test`       | Run unit tests                                       |
| `npm run format` | Format all files with Prettier                       |

## Project structure

```
scripts/                   # Post-build steps: sitemap and robots.txt, Content-Security-Policy
public/                    # Favicons and the social preview image
src/
├── app/
│   ├── core/
│   │   ├── i18n/          # Language service, types and UI translations (en, sr)
│   │   ├── routing/       # Route reuse strategy
│   │   ├── seo/           # Site URL, meta tags, canonical/hreflang links, structured data
│   │   └── theme/         # Light and dark theme
│   ├── data/              # Site content: profile, skills, projects
│   ├── layout/            # Header (with language switch) and footer
│   ├── pages/             # Routed pages
│   ├── sections/          # Page sections (hero, about, projects, skills, contact)
│   └── shared/
│       ├── components/    # Reusable UI components (icon)
│       └── utils/         # Helper functions
├── styles/                # Global styles: tokens, base, layout, components
├── index.html
└── styles.scss
```

## Updating content

Content lives in `src/app/data`:

- `profile.ts` contains name, role, about text, social links, skills and CV link
- `projects.ts` contains the list of projects shown on the page

Translated values are written as `{ en: '...', sr: '...' }`. A plain string is used as is in both
languages, which is handy for names of technologies.

Interface text such as navigation, buttons and section titles lives in
`src/app/core/i18n/translations`.

Project images go in `public/projects/` and are referenced as `/projects/name.png`.

## SEO

- Every language is prerendered as its own page with its own `lang`, title and description.
- Canonical and `hreflang` links (plus `x-default`) connect the English and Serbian versions.
- Open Graph and Twitter tags with a 1200 × 630 preview image (`public/og-image.png`).
- JSON-LD structured data describing the person behind the site.
- `sitemap.xml` with language alternates and `robots.txt`, generated on every build.

The public address of the site is set in one place, `src/app/core/seo/site.ts`. Update `siteUrl`
there when the domain changes.

## Security

- Content-Security-Policy is added to every page after the build (`scripts/csp.ts`). Inline
  scripts are allowed only by their SHA-256 hash, everything else must come from the site itself.
- No third-party requests: fonts are bundled with the site instead of loaded from Google Fonts.
- The email address is not present in the HTML and is decoded only when a visitor clicks.
- External links open with `rel="noopener"`, and the referrer policy is
  `strict-origin-when-cross-origin`.

Headers that cannot be set from HTML (`frame-ancestors`, HSTS, `X-Content-Type-Options`) depend on
the hosting provider.

## Deployment

`npm run build` outputs a fully static site to `dist/portfolio/browser`, which can be deployed to
Netlify, Vercel, Cloudflare Pages or GitHub Pages. Use `npm run build` rather than `ng build`, so
the post-build steps run.
