import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { routeConverter } from '../../global/functions';
import { APP_ROUTES } from '../../global/enums';
import { IMovie } from '../../global/interfaces';
import { CineCornIconComponent } from '../icons/icon.component';

@Component({
  selector: 'cine-corn-movie-card',
  standalone: true,
  imports: [RouterLink, CineCornIconComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class CineCornMovieCardComponent {
  @Input() movie!: IMovie; //! null, service.
  moviePath: string = '';

  ngOnInit() {
    this.moviePath = routeConverter(
      APP_ROUTES.movie_details.replace(':id', this.movie?.title ?? ''),
    );
  }
}
