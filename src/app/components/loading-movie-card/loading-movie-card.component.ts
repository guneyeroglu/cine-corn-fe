import { Component, input, signal } from '@angular/core';
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
  countArray = signal<number[]>([]);

  ngOnInit() {
    this.countArray.set(Array.from({ length: this.count() }, (_, i) => i));
  }
}
