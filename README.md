# Portfolio

My personal portfolio website, built with Angular and prerendered to static HTML. Available in
English (`/`) and Serbian (`/sr`).

## Tech stack

- Angular 22 (standalone components, signals, built-in control flow)
- Static prerendering with `@angular/ssr`, one page per language
- Lightweight signal-based i18n without extra dependencies
- SCSS with CSS custom properties for light and dark themes
- Vitest for unit tests

## Getting started

```bash
npm install
npm start
```

The site runs on `http://localhost:4200/`.

## Scripts

| Command          | Description                                     |
| ---------------- | ----------------------------------------------- |
| `npm start`      | Start the dev server                            |
| `npm run build`  | Build and prerender to `dist/portfolio/browser` |
| `npm test`       | Run unit tests                                  |
| `npm run format` | Format all files with Prettier                  |

## Project structure

```
src/
├── app/
│   ├── core/
│   │   ├── i18n/          # Language service, types and UI translations (en, sr)
│   │   ├── routing/       # Route reuse strategy
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

## Deployment

`npm run build` outputs a fully static site to `dist/portfolio/browser`, which can be deployed to
Netlify, Vercel, Cloudflare Pages or GitHub Pages.
