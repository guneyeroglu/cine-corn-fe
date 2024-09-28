import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Subscription } from 'rxjs';

import { routeConverter } from '../../global/functions';
import { APP_ROUTES } from '../../global/enums';
import { IAuthUser, IAuthUserState, IMenuItem } from '../../global/interfaces';
import { CineCornIconComponent } from '../icons/icon.component';
import { CineCornMenuComponent } from '../menu/menu.component';
import { CineCornMenuItemComponent } from '../menu/menu-item/menu-item.component';
import { CineCornDrawerComponent } from '../drawer/drawer.component';

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
    CineCornDrawerComponent,
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
  private routerSubscription!: Subscription;
  homePath: string = APP_ROUTES.home;
  loginPath: string = APP_ROUTES.login;
  registerPath: string = APP_ROUTES.register;
  myListPath: string = APP_ROUTES.my_list;
  headerMenuList: IMenuItem[] = [
    {
      name: 'Home',
      path: this.homePath,
      icon: 'home',
    },
    {
      name: 'Movies',
      path: APP_ROUTES.movies,
      icon: 'movie',
    },
  ];
  isLoading = signal<boolean>(false);
  user = signal<IAuthUser | null>(null);
  openMenu = signal<boolean>(false);
  openDrawer = signal<boolean>(false);

  onOpenMenu() {
    this.openMenu.set(true);
  }

  onCloseMenu() {
    this.openMenu.set(false);
  }

  onOpenDrawer() {
    this.openDrawer.set(true);
  }

  onCloseDrawer() {
    this.openDrawer.set(false);
  }

  goMyList() {
    this.onCloseMenu();
    this.router.navigate([routeConverter(APP_ROUTES.my_list)]);
  }

  goFavorites() {
    this.onCloseMenu();
    this.router.navigate([routeConverter(APP_ROUTES.favorites)]);
  }

  logout() {
    this.onCloseMenu();
    localStorage.removeItem('token');
    window.location.href = routeConverter(APP_ROUTES.home);
  }

  isActive(path: string): boolean {
    return this.router.isActive(path, {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    });
  }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.onCloseDrawer();
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
