import { Component, input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'cine-corn-movie-detail-text',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './movie-detail-text.component.html',
  styleUrl: './movie-detail-text.component.scss',
})
export class CineCornMovieDetailTextComponent {
  title = input<string>('');
  subtitle = input<string>('');
  isLoading = input<boolean>(true);
}
