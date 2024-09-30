import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Store } from '@ngrx/store';

import { routeConverter } from '../../global/functions';
import { APP_ROUTES, STATUS_TYPE } from '../../global/enums';
import { IError, IMovie, IResponse, ISnackbarState } from '../../global/interfaces';
import { ToggleFavoriteService, ToggleListService } from '../../services/mutate';
import { setSnackbar } from '../../store/actions';
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
  isFavorite = signal<boolean>(false);
  isAddedToList = signal<boolean>(false);

  constructor(
    private toggleFavoriteService: ToggleFavoriteService,
    private toggleListService: ToggleListService,
    private store: Store<{ snackbar: ISnackbarState }>,
  ) {}

  get listIcon() {
    return !this.isAddedToList() ? 'add' : 'check';
  }

  ngOnInit() {
    this.moviePath = routeConverter(
      APP_ROUTES.movie_details.replace(':id', this.movie()?.id ?? ''),
    );
    this.isFavorite.set(this.movie()?.isFavorite ?? false);
    this.isAddedToList.set(this.movie()?.isAddedToList ?? false);
  }

  load() {
    this.isImageLoaded = true;
  }

  handleFavorite(event: MouseEvent, movieId?: string) {
    event.preventDefault();
    event.stopPropagation();
    this.toggleFavoriteService.toggleFavorite(movieId).subscribe({
      next: (res: IResponse) => {
        if (res.status === 201) {
          this.isFavorite.set(true);
        } else {
          this.isFavorite.set(false);
        }
        this.store.dispatch(
          setSnackbar({
            open: true,
            text: res.message,
            statusType: STATUS_TYPE.success,
          }),
        );
      },
      error: (err: IError) => {
        this.store.dispatch(
          setSnackbar({
            open: true,
            text: err.error.message,
            statusType: STATUS_TYPE.error,
          }),
        );
      },
    });
  }

  handleList(event: MouseEvent, movieId?: string) {
    event.preventDefault();
    event.stopPropagation();
    this.toggleListService.toggleList(movieId).subscribe({
      next: (res: IResponse) => {
        if (res.status === 201) {
          this.isAddedToList.set(true);
        } else {
          this.isAddedToList.set(false);
        }
        this.store.dispatch(
          setSnackbar({
            open: true,
            text: res.message,
            statusType: STATUS_TYPE.success,
          }),
        );
      },
      error: (err: IError) => {
        this.store.dispatch(
          setSnackbar({
            open: true,
            text: err.error.message,
            statusType: STATUS_TYPE.error,
          }),
        );
      },
    });
  }
}
