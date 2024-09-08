import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'cine-corn-movie-detail-text',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './movie-detail-text.component.html',
  styleUrl: './movie-detail-text.component.scss',
})
export class CineCornMovieDetailTextComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() isLoading!: boolean;
}
