import { Component, Input } from '@angular/core';

@Component({
  selector: 'cine-corn-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CineCornCardComponent {
  @Input() animationDelay: string = '250ms';
}
