import { Component, input } from '@angular/core';

@Component({
  selector: 'cine-corn-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class CineCornMenuItemComponent {
  disabled = input<boolean>(false);
}
