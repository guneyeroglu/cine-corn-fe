import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { IMovie } from '../../global/interfaces';
import { APP_ROUTES } from '../../global/enums';
import { CineCornMovieCardComponent } from '../movie-card/movie-card.component';
import { CineCornLoadingMovieCardComponent } from '../loading-movie-card/loading-movie-card.component';

@Component({
  selector: 'cine-corn-movie-content',
  standalone: true,
  imports: [RouterLink, CineCornMovieCardComponent, CineCornLoadingMovieCardComponent],
  templateUrl: './movie-content.component.html',
  styleUrl: './movie-content.component.scss',
})
export class CineCornMovieContentComponent {
  title = input<string>('');
  movies = input<IMovie[]>([]);
  isLoading = input<boolean>(true);
  homePath: string = APP_ROUTES.home;
}
