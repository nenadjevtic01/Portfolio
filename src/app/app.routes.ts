import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home, data: { lang: 'en' } },
  { path: 'sr', component: Home, data: { lang: 'sr' } },
  // Prerendered and moved to /404.html after the build, see scripts/seo-files.ts.
  { path: '404', component: NotFound, data: { lang: 'en', notFound: true } },
  { path: 'sr/**', component: NotFound, data: { lang: 'sr', notFound: true } },
  { path: '**', component: NotFound, data: { lang: 'en', notFound: true } },
];
