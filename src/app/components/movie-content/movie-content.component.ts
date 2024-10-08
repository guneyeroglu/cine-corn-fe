import { Component, input, output } from '@angular/core';
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
  title = input.required<string>();
  movies = input.required<IMovie[]>();
  toggleFav = output<void>();
  toggleList = output<void>();
  isLoading = input.required<boolean>();
  homePath: string = APP_ROUTES.home;

  handleFav() {
    if (this.toggleFav) {
      this.toggleFav.emit();
    }
  }

  handleList() {
    if (this.toggleList) {
      this.toggleList.emit();
    }
  }
}
