import { Component } from '@angular/core';
import { IMenuItem } from '../../global/interfaces';
import { APP_ROUTES } from '../../global/enums';
import { CommonModule } from '@angular/common';
import { CineCornIconComponent } from '../../assets/images/svg/cine-corn-icon/cine-corn-icon.component';

@Component({
  selector: 'cine-corn-header',
  standalone: true,
  imports: [CommonModule, CineCornIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class CineCornHeaderComponent {
  homePath = APP_ROUTES.home;

  menuItems: IMenuItem[] = [
    {
      name: 'Home',
      path: APP_ROUTES.home,
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
