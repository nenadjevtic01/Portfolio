import { DOCUMENT, Injectable, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { profile } from '../../data/profile';
import { Language, defaultLanguage, languagePaths, languages } from '../i18n/language';
import { LanguageService } from '../i18n/language.service';
import { ogImage, pageUrl, siteUrl } from './site';

/** Keeps the document head in sync with the current page and language. Runs during prerendering too. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18n = inject(LanguageService);

  /** Undefined until the first navigation ends; until then the prerendered head is already right. */
  private readonly notFound = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.isNotFoundRoute()),
    ),
  );

  constructor() {
    effect(() => {
      const notFound = this.notFound();
      const lang = this.i18n.lang();

      if (notFound === undefined) {
        return;
      }

      if (notFound) {
        this.updateNotFound();
      } else {
        this.update(lang);
      }
    });
  }

  private update(lang: Language): void {
    const t = this.i18n.t();
    const role = this.i18n.localize(profile.role);
    const title = `${profile.name} · ${role}`;
    const url = pageUrl(languagePaths[lang]);
    const image = new URL(ogImage.path, siteUrl).href;

    this.document.documentElement.lang = t.htmlLang;
    this.title.setTitle(title);

    this.meta.removeTag('name="robots"');
    this.meta.updateTag({ name: 'description', content: t.meta.description });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: profile.name });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: t.meta.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:width', content: String(ogImage.width) });
    this.meta.updateTag({ property: 'og:image:height', content: String(ogImage.height) });
    this.meta.updateTag({ property: 'og:image:alt', content: title });
    this.meta.updateTag({ property: 'og:locale', content: t.ogLocale });

    this.setLink('canonical', url);
    for (const language of languages) {
      this.setLink('alternate', pageUrl(languagePaths[language]), language);
    }
    this.setLink('alternate', pageUrl(languagePaths[defaultLanguage]), 'x-default');

    this.setStructuredData(lang, url, role);
  }

  /** A missing page must not be indexed or point search engines at a canonical URL. */
  private updateNotFound(): void {
    const t = this.i18n.t();

    this.document.documentElement.lang = t.htmlLang;
    this.title.setTitle(`${t.notFound.title} · ${profile.name}`);
    this.meta.updateTag({ name: 'robots', content: 'noindex' });
    this.meta.removeTag('property="og:url"');

    this.document.head
      .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang], #structured-data')
      .forEach((element) => element.remove());
  }

  private isNotFoundRoute(): boolean {
    let route = this.router.routerState.snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data['notFound'] === true;
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let link = this.document.head.querySelector<HTMLLinkElement>(selector);

    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      if (hreflang) {
        link.hreflang = hreflang;
      }
      this.document.head.appendChild(link);
    }

    link.href = href;
  }

  private setStructuredData(lang: Language, url: string, role: string): void {
    const home = pageUrl('/');
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${home}#person`,
          name: profile.name,
          jobTitle: role,
          description: this.i18n.localize(profile.tagline),
          url: home,
          image: new URL(profile.photo?.src ?? ogImage.path, siteUrl).href,
          sameAs: profile.socials.map((link) => link.url).filter(Boolean),
          knowsAbout: profile.skills.flatMap((group) =>
            group.items.map((item) => this.i18n.localize(item)),
          ),
          address: { '@type': 'PostalAddress', addressCountry: 'RS' },
        },
        {
          '@type': 'WebPage',
          '@id': url,
          url,
          name: this.title.getTitle(),
          inLanguage: lang,
          about: { '@id': `${home}#person` },
        },
      ],
    };

    let script = this.document.head.querySelector<HTMLScriptElement>('#structured-data');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data).replaceAll('<', '\\u003c');
  }
}
