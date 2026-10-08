import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'copy'
  | 'check'
  | 'external'
  | 'download'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'arrow-down';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'icon' },
  styles: `
    :host {
      display: inline-flex;
      width: 1.15em;
      height: 1.15em;
      flex-shrink: 0;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
