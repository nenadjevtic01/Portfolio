import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { PageReuseStrategy } from './core/routing/page-reuse.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: RouteReuseStrategy, useClass: PageReuseStrategy },
    provideClientHydration(),
  ],
};
