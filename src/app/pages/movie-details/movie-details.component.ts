import { Component } from '@angular/core';

import { CineCornMovieDetailTextComponent } from './components/movie-detail-text.component';

@Component({
  selector: 'cine-corn-movie-details',
  standalone: true,
  imports: [CineCornMovieDetailTextComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class CineCornMovieDetailsComponent {}
