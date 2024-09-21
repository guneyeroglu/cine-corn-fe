import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CineCornMovieContentComponent } from '../../components/movie-content/movie-content.component';
import { MovieService } from '../../services/query';
import { manageLoadingState } from '../../global/functions';
import { IError, IMovie, IResponse } from '../../global/interfaces';

@Component({
  selector: 'cine-corn-favorites',
  standalone: true,
  imports: [CineCornMovieContentComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class CineCornFavoritesComponent {
  constructor(private movieService: MovieService) {}

  title: string = 'Favorites';
  movies: IMovie[] = [];
  isLoading: boolean = true;
  startTime: number = Date.now();

  ngOnInit() {
    this.getAllMovies().subscribe((res: IMovie[]) => {
      this.movies = res;
      manageLoadingState(() => (this.isLoading = false), this.startTime);
    });
  }

  getAllMovies(): Observable<IMovie[]> {
    return new Observable<IMovie[]>(observer => {
      this.movieService.getAllMovies().subscribe({
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
}
