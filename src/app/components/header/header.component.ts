import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { IMenuItem } from '../../global/interfaces';
import { APP_ROUTES } from '../../global/enums';
import { CineCornIconComponent } from '../icons';

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
  ];
}
