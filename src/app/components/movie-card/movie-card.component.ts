import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { APP_ROUTES } from '../../global/enums';
import { IMovie } from '../../global/interfaces';

@Component({
  selector: 'cine-corn-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
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
