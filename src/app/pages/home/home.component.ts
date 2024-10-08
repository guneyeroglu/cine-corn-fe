import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieService } from '../../services/query';
import { manageLoadingState } from '../../global/functions';
import { MOVIE_TYPE } from '../../global/enums';
import { IError, IMovie, IResponse } from '../../global/interfaces';
import { CineCornMovieContentComponent } from '../../components/movie-content/movie-content.component';

@Component({
  selector: 'cine-corn-home',
  standalone: true,
  imports: [CineCornMovieContentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class CineCornHomeComponent {
  constructor(private movieService: MovieService) {}

  featuredMoviesTitle: string = 'Featured Movies';
  featuredMovie: IMovie[] = [];
  isLoadingForFeaturedMovie: boolean = true;
  featuredMovieError: string = '';

  newMoviesTitle: string = 'New on CineCorn';
  newMovies: IMovie[] = [];
  isLoadingForNewMovies: boolean = true;
  newMoviesError: string = '';
  startTime: number = Date.now();

  ngOnInit() {
    this.getMovies(MOVIE_TYPE.isFeatured).subscribe({
      next: (res: IMovie[]) => {
        this.featuredMovie = res;
        manageLoadingState(() => (this.isLoadingForFeaturedMovie = false), this.startTime);
      },
      error: () => {
        manageLoadingState(() => (this.isLoadingForFeaturedMovie = false), this.startTime);
      },
    });

    this.getMovies(MOVIE_TYPE.isNew).subscribe({
      next: (res: IMovie[]) => {
        this.newMovies = res;
        manageLoadingState(() => (this.isLoadingForNewMovies = false), this.startTime);
      },
      error: () => {
        manageLoadingState(() => (this.isLoadingForNewMovies = false), this.startTime);
      },
    });
  }

  getMovies(type?: keyof typeof MOVIE_TYPE): Observable<IMovie[]> {
    return new Observable<IMovie[]>(observer => {
      this.movieService.getAllMovies(type).subscribe({
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
