import { Component } from '@angular/core';

import { movies } from '../../global/consts';
import { IMovie } from '../../global/interfaces';
import { CineCornMovieContentComponent } from '../../components/movie-content/movie-content.component';

@Component({
  selector: 'cine-corn-home',
  standalone: true,
  imports: [CineCornMovieContentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class CineCornHomeComponent {
  allMoviesTitle: string = 'All Movies';
  featuredMoviesTitle: string = 'Featured Movies';
  allMoviesDb: IMovie[] = movies;
  featuredMoviesDb: IMovie[] = movies;
}
