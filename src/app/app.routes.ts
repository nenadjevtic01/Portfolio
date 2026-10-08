import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home, data: { lang: 'en' } },
  { path: 'sr', component: Home, data: { lang: 'sr' } },
  { path: '**', redirectTo: '' },
];
