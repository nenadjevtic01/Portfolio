import { DOCUMENT, Injectable, inject } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  // The initial theme is set by the inline script in index.html to avoid a flash on load.
  toggle(): void {
    const root = this.document.documentElement;
    const next: Theme = root.dataset['theme'] === 'dark' ? 'light' : 'dark';
    root.dataset['theme'] = next;

    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies).
    }
  }
}
