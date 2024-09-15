import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';

import { APP_ROUTES } from '../../global/enums';
import { IAuthUser, IAuthUserState, IMenuItem } from '../../global/interfaces';
import { CineCornIconComponent } from '../icons/icon.component';

@Component({
  selector: 'cine-corn-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CineCornIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class CineCornHeaderComponent {
  constructor(private store: Store<{ user: IAuthUserState }>) {
    this.store.select('user').subscribe((state: IAuthUserState) => {
      this.user.set(state.user);
    });
  }
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

  user = signal<IAuthUser | null>(null);
}
