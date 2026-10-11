import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './core/seo/seo.service';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly document = inject(DOCUMENT);

  constructor() {
    inject(SeoService);

    // Opening a link like /sr#projects scrolls before web fonts load and shift the layout,
    // so scroll to the section again once they are ready.
    afterNextRender(() => {
      const id = decodeURIComponent(this.document.location.hash.slice(1));
      if (id) {
        this.document.fonts.ready.then(() => this.document.getElementById(id)?.scrollIntoView());
      }
    });
  }
}
