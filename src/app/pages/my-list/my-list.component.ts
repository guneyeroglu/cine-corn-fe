import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CineCornMovieContentComponent } from '../../components/movie-content/movie-content.component';
import { MovieService } from '../../services/query';
import { manageLoadingState } from '../../global/functions';
import { IError, IMovie, IResponse } from '../../global/interfaces';

@Component({
  selector: 'cine-corn-my-list',
  standalone: true,
  imports: [CineCornMovieContentComponent],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss',
})
export class CineCornMyListComponent {
  constructor(private movieService: MovieService) {}

  title: string = 'My List';
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
