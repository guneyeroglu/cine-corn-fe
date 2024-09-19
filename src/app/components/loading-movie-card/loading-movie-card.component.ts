import { Component, input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'cine-corn-loading-movie-card',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './loading-movie-card.component.html',
  styleUrl: './loading-movie-card.component.scss',
})
export class CineCornLoadingMovieCardComponent {
  count = input<number>(1);
  countArray: number[] = [];

  ngOnInit() {
    this.countArray = Array.from({ length: this.count() }, (_, i) => i);
  }
}
