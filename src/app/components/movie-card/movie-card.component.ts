import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../global/enums';
import { IMovie } from '../../global/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cine-corn-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class CineCornMovieCardComponent {
  @Input() movie!: IMovie;
  movieDetailsPath!: string;
  isFavorite: boolean = false; //! service.
  isHovered: boolean = false;

  ngOnInit() {
    const resolvedPath: string = APP_ROUTES.movie_details.replace(':id', this.movie.id.toString());
    this.movieDetailsPath = resolvedPath;
  }
}
