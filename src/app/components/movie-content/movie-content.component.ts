import { Component, input, Input } from '@angular/core';

import { IMovie } from '../../global/interfaces';
import { CineCornMovieCardComponent } from '../movie-card/movie-card.component';
import { CineCornLoadingMovieCardComponent } from '../loading-movie-card/loading-movie-card.component';

@Component({
  selector: 'cine-corn-movie-content',
  standalone: true,
  imports: [CineCornMovieCardComponent, CineCornLoadingMovieCardComponent],
  templateUrl: './movie-content.component.html',
  styleUrl: './movie-content.component.scss',
})
export class CineCornMovieContentComponent {
  title = input<string>('');
  movies = input<IMovie[]>([]);
  isLoading = input<boolean>(true);
}
