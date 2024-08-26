import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IMovie } from '../../global/interfaces';
import { CineCornMovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'cine-corn-movie-content',
  standalone: true,
  imports: [CommonModule, CineCornMovieCardComponent],
  templateUrl: './movie-content.component.html',
  styleUrl: './movie-content.component.scss',
})
export class CineCornMovieContentComponent {
  @Input() title!: string;
  @Input() movies!: IMovie[];
}
