import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { routeConverter } from '../../global/functions';
import { APP_ROUTES } from '../../global/enums';
import { IMovie } from '../../global/interfaces';
import { CineCornIconComponent } from '../icons/icon.component';

@Component({
  selector: 'cine-corn-movie-card',
  standalone: true,
  imports: [RouterLink, NgxSkeletonLoaderModule, CineCornIconComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class CineCornMovieCardComponent {
  movie = input<IMovie | null>(null);
  isImageLoaded: boolean = false;
  moviePath: string = '';
  isFavorite: boolean = true;
  isInList: boolean = true;

  get listIcon() {
    return this.isInList ? 'add' : 'check';
  }

  ngOnInit() {
    this.moviePath = routeConverter(
      APP_ROUTES.movie_details.replace(':id', this.movie()?.id ?? ''),
    );
  }

  load() {
    this.isImageLoaded = true;
  }

  handleFavorite(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isFavorite = !this.isFavorite;
  }

  handleList(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isInList = !this.isInList;
  }
}
