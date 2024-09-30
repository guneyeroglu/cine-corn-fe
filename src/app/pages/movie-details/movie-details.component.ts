import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CineCornMovieDetailTextComponent } from './components/movie-detail-text.component';
import {
  MovieDetailsService,
  ToggleFavoriteService,
  ToggleListService,
} from '../../services/mutate';
import { formatDateString, joinArrayToString, manageLoadingState } from '../../global/functions';
import { IError, IMovieDetails, IResponse, ISnackbarState } from '../../global/interfaces';
import { STATUS_TYPE } from '../../global/enums';
import { setSnackbar } from '../../store/actions';

@Component({
  selector: 'cine-corn-movie-details',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, CineCornMovieDetailTextComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class CineCornMovieDetailsComponent {
  constructor(
    private movieDetailsService: MovieDetailsService,
    private toggleFavoriteService: ToggleFavoriteService,
    private toggleListService: ToggleListService,
    private store: Store<{ snackbar: ISnackbarState }>,
    private route: ActivatedRoute,
  ) {}

  isLoadingMovieDetails: boolean = true;
  isBannerLoaded: boolean = false;
  isPosterLoaded: boolean = false;
  movieId!: string;
  movieDetails: IMovieDetails | undefined = undefined;
  genreNames: string = '';
  starNames: string = '';
  releaseDate: string = '';
  runTime: string = '';
  startTime: number = Date.now();
  isFavorite = signal<boolean>(false);
  isAddedToList = signal<boolean>(false);

  get favoriteText() {
    return this.isFavorite() ? 'Remove My Favorite' : 'Add My Favorite';
  }

  get listText() {
    return this.isAddedToList() ? 'Remove My List' : 'Add My List';
  }

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.getMovieDetails(this.movieId).subscribe({
      next: (res: IMovieDetails) => {
        this.genreNames = joinArrayToString(res.genres);
        this.starNames = joinArrayToString(res.stars);
        this.releaseDate = formatDateString(res.releaseDate);
        this.runTime = res.runTime ? `${res.runTime} min` : '-';
        this.isFavorite.set(res.isFavorite);
        this.isAddedToList.set(res.isAddedToList);
        this.movieDetails = res;
        manageLoadingState(() => (this.isLoadingMovieDetails = false), this.startTime);
      },
      error: () => {
        manageLoadingState(() => (this.isLoadingMovieDetails = false), this.startTime);
      },
    });
  }

  getMovieDetails(id: string): Observable<IMovieDetails> {
    return new Observable<IMovieDetails>(observer => {
      this.movieDetailsService.getMovieDetails(id).subscribe({
        next: (res: IResponse<IMovieDetails>) => {
          observer.next(res.data);
          observer.complete();
        },
        error: (err: IError) => {
          observer.error(err);
        },
      });
    });
  }

  bannerLoad() {
    manageLoadingState(() => (this.isBannerLoaded = true), this.startTime);
  }

  posterLoad() {
    manageLoadingState(() => (this.isPosterLoaded = true), this.startTime);
  }

  handleFavorite() {
    this.toggleFavoriteService.toggleFavorite(this.movieId).subscribe({
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

  handleList() {
    this.toggleListService.toggleList(this.movieId).subscribe({
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
