import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { IMenuItem } from '../../global/interfaces';
import { APP_ROUTES } from '../../global/enums';
import { CineCornIconComponent } from '../icons/icon.component';

@Component({
  selector: 'cine-corn-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, CineCornIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class CineCornHeaderComponent {
  homePath: string = APP_ROUTES.home;
  loginPath: string = APP_ROUTES.login;
  registerPath: string = APP_ROUTES.register;
  headerMenuList: IMenuItem[] = [
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
