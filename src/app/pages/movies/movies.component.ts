import { Component } from '@angular/core';

import { CineCornMovieContentComponent } from '../../components/movie-content/movie-content.component';
import { IMovie, IResponse } from '../../global/interfaces';
import { MovieService } from '../../services/query';
import { Observable } from 'rxjs';
import { manageLoadingState } from '../../global/functions';

@Component({
  selector: 'cine-corn-movies',
  standalone: true,
  imports: [CineCornMovieContentComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class CineCornMoviesComponent {
  title: string = 'All Movies';
  movies: IMovie[] = [];
  isLoading: boolean = true;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    const startTime: number = Date.now();
    this.getAllMovies().subscribe((res: IMovie[]) => {
      this.movies = res;
      manageLoadingState(() => (this.isLoading = false), startTime);
    });
  }

  getAllMovies(): Observable<IMovie[]> {
    return new Observable<IMovie[]>(observer => {
      this.movieService.getAllMovies().subscribe({
        next: (res: IResponse<IMovie[]>) => {
          observer.next(res.data);
          observer.complete();
        },
        error: err => {
          observer.error(err);
        },
      });
    });
  }
}
