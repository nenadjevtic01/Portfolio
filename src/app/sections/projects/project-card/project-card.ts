import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LanguageService } from '../../../core/i18n/language.service';
import { Project } from '../../../data/projects';
import { Icon } from '../../../shared/components/icon/icon';

@Component({
  selector: 'app-project-card',
  imports: [Icon],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  protected readonly i18n = inject(LanguageService);

  readonly project = input.required<Project>();
}
