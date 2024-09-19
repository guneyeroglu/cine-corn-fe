import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { routeConverter } from '../../global/functions';
import { APP_ROUTES } from '../../global/enums';
import { IAuthUser, IAuthUserState, IMenuItem } from '../../global/interfaces';
import { CineCornIconComponent } from '../icons/icon.component';
import { CineCornMenuComponent } from '../menu/menu.component';
import { CineCornMenuItemComponent } from '../menu/menu-item/menu-item.component';

@Component({
  selector: 'cine-corn-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgxSkeletonLoaderModule,
    CineCornIconComponent,
    CineCornMenuComponent,
    CineCornMenuItemComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class CineCornHeaderComponent {
  constructor(
    private store: Store<{ user: IAuthUserState }>,
    private router: Router,
  ) {
    this.store.select('user').subscribe((state: IAuthUserState) => {
      this.user.set(state.user);
      this.isLoading.set(state.isLoading);
    });
  }
  homePath: string = APP_ROUTES.home;
  loginPath: string = APP_ROUTES.login;
  registerPath: string = APP_ROUTES.register;
  myListPath: string = APP_ROUTES.my_list;
  headerMenuList: IMenuItem[] = [
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
  ];
  isLoading = signal<boolean>(false);
  user = signal<IAuthUser | null>(null);
  openMenu = signal<boolean>(false);

  onOpenMenu() {
    this.openMenu.set(true);
  }

  onCloseMenu() {
    this.openMenu.set(false);
  }

  goUserPage() {
    this.onCloseMenu();
    this.router.navigate([routeConverter(APP_ROUTES.profile)]);
  }

  goUserList() {
    this.onCloseMenu();
    this.router.navigate([routeConverter(APP_ROUTES.my_list)]);
  }

  logout() {
    localStorage.removeItem('token');
    this.onCloseMenu();
    window.location.href = routeConverter(APP_ROUTES.home);
  }
}
