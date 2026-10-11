import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { profile, visibleSocials } from '../../data/profile';
import { Icon } from '../../shared/components/icon/icon';

@Component({
  selector: 'app-hero',
  imports: [Icon, NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  protected readonly i18n = inject(LanguageService);
  protected readonly profile = profile;
  protected readonly socials = visibleSocials;
}
