import { Location } from '@angular/common';
import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Language, LocalizedText, defaultLanguage, languagePaths, languages } from './language';
import { en } from './translations/en';
import { sr } from './translations/sr';
import { Translation } from './translations/translation';

const translations: Record<Language, Translation> = { en, sr };

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  /**
   * The current language, taken from the `lang` data of the active route. The first value comes
   * from the URL, because the app renders before the router finishes its first navigation.
   */
  readonly lang = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.routeLanguage()),
    ),
    { initialValue: this.urlLanguage() },
  );

  /** UI strings for the current language. */
  readonly t = computed(() => translations[this.lang()]);

  /** Path of the page in the current language, used to build anchor links. */
  readonly homePath = computed(() => languagePaths[this.lang()]);

  localize(value: LocalizedText): string {
    return typeof value === 'string' ? value : value[this.lang()];
  }

  private routeLanguage(): Language {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data['lang'] ?? defaultLanguage;
  }

  private urlLanguage(): Language {
    const segment = this.location.path().split(/[/?#]/).find(Boolean);
    return languages.find((lang) => languagePaths[lang] === `/${segment}`) ?? defaultLanguage;
  }
}
