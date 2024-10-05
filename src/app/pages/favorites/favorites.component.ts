import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { manageLoadingState } from '../../global/functions';
import { IError, IMovie, IResponse } from '../../global/interfaces';
import { FavoriteService } from '../../services/query';
import { CineCornMovieContentComponent } from '../../components/movie-content/movie-content.component';

@Component({
  selector: 'cine-corn-favorites',
  standalone: true,
  imports: [CineCornMovieContentComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class CineCornFavoritesComponent {
  constructor(private favoriteService: FavoriteService) {}

  title: string = 'Favorites';
  movies: IMovie[] = [];
  isLoading: boolean = true;
  startTime: number = Date.now();

  ngOnInit() {
    this.getFavoriteMovies().subscribe({
      next: (res: IMovie[]) => {
        this.movies = res;
        manageLoadingState(() => (this.isLoading = false), this.startTime);
      },
      error: () => {
        manageLoadingState(() => (this.isLoading = false), this.startTime);
      },
    });
  }

  getFavoriteMovies(): Observable<IMovie[]> {
    return new Observable<IMovie[]>(observer => {
      this.favoriteService.getFavoriteMovies().subscribe({
        next: (res: IResponse<IMovie[]>) => {
          observer.next(res.data);
          observer.complete();
        },
        error: (err: IError) => {
          observer.error(err);
        },
      });
    });
  }

  toggleFav() {
    this.movies = this.movies.filter((movie: IMovie) => movie.isFavorite);
  }
}
