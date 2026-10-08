import { ChangeDetectionStrategy, Component } from '@angular/core';
import { About } from '../../sections/about/about';
import { Contact } from '../../sections/contact/contact';
import { Hero } from '../../sections/hero/hero';
import { Projects } from '../../sections/projects/projects';
import { Skills } from '../../sections/skills/skills';

@Component({
  selector: 'app-home',
  imports: [Hero, About, Projects, Skills, Contact],
  template: `
    <app-hero />
    <app-about />
    <app-projects />
    <app-skills />
    <app-contact />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
