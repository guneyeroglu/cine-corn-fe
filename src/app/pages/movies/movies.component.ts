import { Component } from '@angular/core';

import { CineCornMovieContentComponent } from '../../components/movie-content/movie-content.component';
import { movies } from '../../global/consts';
import { IMovie } from '../../global/interfaces';

@Component({
  selector: 'cine-corn-movies',
  standalone: true,
  imports: [CineCornMovieContentComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class CineCornMoviesComponent {
  title: string = 'All Movies';
  moviesDb: IMovie[] = movies;
}
