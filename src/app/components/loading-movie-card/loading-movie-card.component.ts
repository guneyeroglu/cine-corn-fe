import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'cine-corn-loading-movie-card',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './loading-movie-card.component.html',
  styleUrl: './loading-movie-card.component.scss',
})
export class CineCornLoadingMovieCardComponent {
  @Input() count!: number;
  countArray: number[] = [];

  ngOnInit() {
    this.countArray = Array.from({ length: this.count }, (_, i) => i);
  }
}
