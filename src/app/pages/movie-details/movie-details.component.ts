import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Observable } from 'rxjs';

import { CineCornMovieDetailTextComponent } from './components/movie-detail-text.component';
import { MovieDetailsService } from '../../services/mutate';
import { formatDateString, joinArrayToString, manageLoadingState } from '../../global/functions';
import { IError, IMovieDetails, IResponse } from '../../global/interfaces';

@Component({
  selector: 'cine-corn-movie-details',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, CineCornMovieDetailTextComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class CineCornMovieDetailsComponent {
  isLoadingMovieDetails: boolean = true;
  isBannerLoaded: boolean = false;
  isPosterLoaded: boolean = false;
  movieId!: string;
  movieDetails: IMovieDetails | undefined = undefined;
  constructor(
    private movieDetailsService: MovieDetailsService,
    private route: ActivatedRoute,
  ) {}

  genreNames: string = '';
  starNames: string = '';
  releaseDate: string = '';
  runTime: string = '';

  ngOnInit() {
    const startTime: number = Date.now();
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.getMovieDetails(this.movieId).subscribe((res: IMovieDetails) => {
      this.genreNames = joinArrayToString(res.genres);
      this.starNames = joinArrayToString(res.stars);
      this.releaseDate = formatDateString(res.releaseDate);
      this.runTime = res.runTime ? `${res.runTime} min` : '-';
      this.movieDetails = res;
      manageLoadingState(() => (this.isLoadingMovieDetails = false), startTime);
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
    this.isBannerLoaded = true;
  }

  posterLoad() {
    this.isPosterLoaded = true;
  }
}
