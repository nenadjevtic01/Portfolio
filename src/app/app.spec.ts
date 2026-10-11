import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { pageUrl } from './core/seo/site';
import { profile } from './data/profile';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  async function render(url: string): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('should render the name in the hero', async () => {
    const page = await render('/');
    expect(page.querySelector('h1')?.textContent).toContain(profile.name);
  });

  it('should render English on / and Serbian on /sr', async () => {
    expect((await render('/')).querySelector('#about h2')?.textContent).toContain('About me');
    expect((await render('/sr')).querySelector('#about h2')?.textContent).toContain('O meni');
  });

  it('should set the html lang attribute', async () => {
    await render('/sr');
    expect(document.documentElement.lang).toBe('sr-Latn');
  });

  it('should set canonical and hreflang links for the current language', async () => {
    await render('/sr');
    const head = document.head;

    expect(head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(pageUrl('/sr'));
    expect(head.querySelectorAll('link[rel="alternate"][hreflang]')).toHaveLength(3);
    expect(head.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('sr_RS');
  });

  it('should add Person structured data', async () => {
    await render('/');
    const json = document.getElementById('structured-data')?.textContent ?? '{}';
    const person = JSON.parse(json)['@graph'][0];

    expect(person['@type']).toBe('Person');
    expect(person.name).toBe(profile.name);
  });

  it('should not render the email address in the markup', async () => {
    const page = await render('/');
    expect(page.innerHTML).not.toContain('@nenadjevtic.dev');
  });
});
