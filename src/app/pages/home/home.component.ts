import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CineCornMovieContentComponent } from '../../components/movie-content/movie-content.component';
import { manageLoadingState } from '../../global/functions';
import { MovieService } from '../../services/query';
import { MOVIE_TYPE } from '../../global/enums';
import { IError, IMovie, IResponse } from '../../global/interfaces';

@Component({
  selector: 'cine-corn-home',
  standalone: true,
  imports: [CineCornMovieContentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class CineCornHomeComponent {
  featuredMoviesTitle: string = 'Featured Movies';
  featuredMovie: IMovie[] = [];
  isLoadingForFeaturedMovie: boolean = true;
  featuredMovieError: string = '';

  newMoviesTitle: string = 'New on CineCorn';
  newMovies: IMovie[] = [];
  isLoadingForNewMovies: boolean = true;
  newMoviesError: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    const startTime: number = Date.now();

    this.getMovies(MOVIE_TYPE.isFeatured).subscribe((res: IMovie[]) => {
      this.featuredMovie = res;
      manageLoadingState(() => (this.isLoadingForFeaturedMovie = false), startTime);
    });

    this.getMovies(MOVIE_TYPE.isNew).subscribe((res: IMovie[]) => {
      this.newMovies = res;
      manageLoadingState(() => (this.isLoadingForNewMovies = false), startTime);
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
