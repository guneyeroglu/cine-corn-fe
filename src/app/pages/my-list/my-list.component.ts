import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ListService } from '../../services/query';
import { manageLoadingState } from '../../global/functions';
import { IError, IMovie, IResponse } from '../../global/interfaces';
import { CineCornMovieContentComponent } from '../../components/movie-content/movie-content.component';

@Component({
  selector: 'cine-corn-my-list',
  standalone: true,
  imports: [CineCornMovieContentComponent],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss',
})
export class CineCornMyListComponent {
  constructor(private listService: ListService) {}

  title: string = 'My List';
  movies: IMovie[] = [];
  isLoading: boolean = true;
  startTime: number = Date.now();

  ngOnInit() {
    this.getListMovies().subscribe({
      next: (res: IMovie[]) => {
        this.movies = res;
        manageLoadingState(() => (this.isLoading = false), this.startTime);
      },
      error: () => {
        manageLoadingState(() => (this.isLoading = false), this.startTime);
      },
    });
  }

  getListMovies(): Observable<IMovie[]> {
    return new Observable<IMovie[]>(observer => {
      this.listService.getListMovies().subscribe({
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
