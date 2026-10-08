import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { languagePaths, languages } from '../../../core/i18n/language';
import { LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-language-switch',
  imports: [RouterLink],
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitch {
  protected readonly i18n = inject(LanguageService);
  protected readonly languages = languages;
  protected readonly paths = languagePaths;
}
