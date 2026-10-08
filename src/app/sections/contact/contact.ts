import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { profile, visibleSocials } from '../../data/profile';
import { Icon } from '../../shared/components/icon/icon';
import { decodeEmail } from '../../shared/utils/email';

@Component({
  selector: 'app-contact',
  imports: [Icon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly i18n = inject(LanguageService);
  protected readonly socials = visibleSocials;
  protected readonly email = signal<string | null>(null);
  protected readonly copied = signal(false);

  private copiedTimeout?: ReturnType<typeof setTimeout>;

  protected sendEmail(): void {
    window.location.href = `mailto:${this.revealEmail()}`;
  }

  protected async copyEmail(): Promise<void> {
    const email = this.revealEmail();

    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // The address is shown on the page, so it can still be copied by hand.
      return;
    }

    this.copied.set(true);
    clearTimeout(this.copiedTimeout);
    this.copiedTimeout = setTimeout(() => this.copied.set(false), 2000);
  }

  private revealEmail(): string {
    const email = decodeEmail(profile.emailEncoded);
    this.email.set(email);
    return email;
  }
}
