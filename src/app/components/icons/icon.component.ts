import { Component, Input } from '@angular/core';

@Component({
  selector: 'cine-corn-icon',
  standalone: true,
  imports: [],
  template: `<span class="material-symbols-outlined">{{ icon }}</span>`,
})
export class CineCornIconComponent {
  @Input() icon!: string;
}
