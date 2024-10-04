import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieService } from '../../services/query';
import { manageLoadingState } from '../../global/functions';
import { IError, IMovie, IResponse } from '../../global/interfaces';
import { CineCornMovieContentComponent } from '../../components/movie-content/movie-content.component';

@Component({
  selector: 'cine-corn-movies',
  standalone: true,
  imports: [CineCornMovieContentComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class CineCornMoviesComponent {
  constructor(private movieService: MovieService) {}

  title: string = 'All Movies';
  movies: IMovie[] = [];
  isLoading: boolean = true;
  startTime: number = Date.now();

  ngOnInit() {
    this.getAllMovies().subscribe({
      next: (res: IMovie[]) => {
        this.movies = res;
        manageLoadingState(() => (this.isLoading = false), this.startTime);
      },
      error: () => {
        manageLoadingState(() => (this.isLoading = false), this.startTime);
      },
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
