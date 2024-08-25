import { Component, Input } from '@angular/core';

@Component({
  selector: 'cine-corn-icon',
  standalone: true,
  imports: [],
  template: `<span class="material-symbols-outlined">{{ icon }}</span>`,
  styles: `
    :host {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  `,
})
export class CineCornIconComponent {
  @Input() icon!: string;
}
