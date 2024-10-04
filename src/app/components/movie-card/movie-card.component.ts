import { Component, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  isImageLoaded = signal<boolean>(false);
  moviePath = signal<string>('');
  isFavorite = signal<boolean>(false);
  isAddedToList = signal<boolean>(false);

  constructor(
    private toggleFavoriteService: ToggleFavoriteService,
    private toggleListService: ToggleListService,
    private router: Router,
    private store: Store<{ snackbar: ISnackbarState }>,
  ) {}

  get listIcon() {
    return !this.isAddedToList() ? 'add' : 'check';
  }

  ngOnInit() {
    this.moviePath.set(
      routeConverter(APP_ROUTES.movie_details.replace(':id', this.movie()?.id ?? '')),
    );
    this.isFavorite.set(this.movie()?.isFavorite ?? false);
    this.isAddedToList.set(this.movie()?.isAddedToList ?? false);
  }

  load() {
    this.isImageLoaded.set(true);
  }

  handleFavorite(event: MouseEvent, movieId?: string) {
    event.preventDefault();
    event.stopPropagation();
    this.toggleFavoriteService.toggleFavorite(movieId).subscribe({
      next: (res: IResponse) => {
        this.isFavorite.set(res.status === 201);
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

        if (err.error.status === 401) {
          this.router.navigate([routeConverter(APP_ROUTES.login)]);
        }
      },
    });
  }

  handleList(event: MouseEvent, movieId?: string) {
    event.preventDefault();
    event.stopPropagation();
    this.toggleListService.toggleList(movieId).subscribe({
      next: (res: IResponse) => {
        this.isAddedToList.set(res.status === 201);
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

        if (err.error.status === 401) {
          this.router.navigate([routeConverter(APP_ROUTES.login)]);
        }
      },
    });
  }
}
