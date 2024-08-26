import { Component } from '@angular/core';

import { CineCornMovieContentComponent } from '../../components/movie-content/movie-content.component';
import { movies } from '../../global/consts';
import { IMovie } from '../../global/interfaces';

@Component({
  selector: 'cine-corn-home',
  standalone: true,
  imports: [CineCornMovieContentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class CineCornHomeComponent {
  newMoviesTitle: string = 'New on CineCorn';
  newMoviesDb: IMovie[] = movies;
  featuredMoviesTitle: string = 'Featured Movies';
  featuredMoviesDb: IMovie[] = movies;
}
