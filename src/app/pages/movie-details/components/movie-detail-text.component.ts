import { Component, Input } from '@angular/core';

@Component({
  selector: 'cine-corn-movie-detail-text',
  standalone: true,
  imports: [],
  templateUrl: './movie-detail-text.component.html',
  styleUrl: './movie-detail-text.component.scss',
})
export class CineCornMovieDetailTextComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
}
