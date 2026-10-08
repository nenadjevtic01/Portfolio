import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { ThemeService } from '../../core/theme/theme.service';
import { profile } from '../../data/profile';
import { Icon } from '../../shared/components/icon/icon';
import { LanguageSwitch } from './language-switch/language-switch';

@Component({
  selector: 'app-header',
  imports: [Icon, LanguageSwitch],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly theme = inject(ThemeService);
  protected readonly i18n = inject(LanguageService);

  protected readonly name = profile.name;
  protected readonly menuOpen = signal(false);
  protected readonly links = computed(() => {
    const nav = this.i18n.t().nav;
    const path = this.i18n.homePath();

    return [
      { label: nav.about, href: `${path}#about` },
      { label: nav.projects, href: `${path}#projects` },
      { label: nav.skills, href: `${path}#skills` },
      { label: nav.contact, href: `${path}#contact` },
    ];
  });

  protected toggleTheme(): void {
    this.theme.toggle();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
