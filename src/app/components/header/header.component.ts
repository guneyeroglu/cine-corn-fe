import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IMenuItem } from '../../global/interfaces';
import { APP_ROUTES } from '../../global/enums';
import { CineCornIconComponent } from '../icons';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'cine-corn-header',
  standalone: true,
  imports: [CommonModule, CineCornIconComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class CineCornHeaderComponent {
  homePath = APP_ROUTES.home;

  menuItems: IMenuItem[] = [
    {
      name: 'Home',
      path: this.homePath,
    },
    {
      name: 'Movies',
      path: APP_ROUTES.movies,
    },
    {
      name: 'Lists',
      path: APP_ROUTES.lists,
    },
    {
      name: 'Favorites',
      path: APP_ROUTES.favorites,
    },
  ];
}
