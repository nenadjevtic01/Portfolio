import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly i18n = inject(LanguageService);
  protected readonly about = profile.about;
  protected readonly highlights = profile.highlights;
}
