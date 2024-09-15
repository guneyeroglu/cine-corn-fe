import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { APP_ROUTES } from '../../global/enums';
import { IMenuItem } from '../../global/interfaces';
import { CineCornIconComponent } from '../icons/icon.component';

@Component({
  selector: 'cine-corn-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CineCornIconComponent],
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
