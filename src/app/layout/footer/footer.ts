import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly i18n = inject(LanguageService);
  protected readonly name = profile.name;
  protected readonly year = new Date().getFullYear();
}
