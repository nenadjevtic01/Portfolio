import { DOCUMENT, Injectable, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { profile } from '../../data/profile';
import { Language, LocalizedText, defaultLanguage, languagePaths } from './language';
import { en } from './translations/en';
import { sr } from './translations/sr';
import { Translation } from './translations/translation';

const translations: Record<Language, Translation> = { en, sr };

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  /** The current language, taken from the `lang` data of the active route. */
  readonly lang = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.routeLanguage()),
    ),
    { initialValue: defaultLanguage },
  );

  /** UI strings for the current language. */
  readonly t = computed(() => translations[this.lang()]);

  /** Path of the page in the current language, used to build anchor links. */
  readonly homePath = computed(() => languagePaths[this.lang()]);

  constructor() {
    effect(() => this.updateDocument());
  }

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

  private updateDocument(): void {
    const t = this.t();
    const title = `${profile.name} · ${this.localize(profile.role)}`;

    this.document.documentElement.lang = t.htmlLang;
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: t.meta.description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: t.meta.description });
  }
}
