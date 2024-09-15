import { Component, signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { CineCornSnackbarComponent } from './components/snackbar/snackbar.component';
import { CineCornHeaderComponent } from './components/header/header.component';
import { CineCornFooterComponent } from './components/footer/footer.component';
import { scrollToTop } from './global/functions';
import { AuthUserService } from './services/query';
import { IAuthUser, IAuthUserState, IResponse } from './global/interfaces';
import { setAuthUser } from './store/actions';

@Component({
  selector: 'cine-corn-app',
  standalone: true,

  imports: [
    RouterOutlet,
    CineCornHeaderComponent,
    CineCornFooterComponent,
    CineCornSnackbarComponent,
  ],
  templateUrl: './app.component.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100%;

      .grow {
        flex-grow: 1;
      }
    }
  `,
})
export class CineCornAppComponent {
  @ViewChild(CineCornSnackbarComponent) snackbarComponent!: CineCornSnackbarComponent;
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authUserService: AuthUserService,
    private store: Store<{ user: IAuthUserState }>,
  ) {
    this.subscription.add(
      this.store.select('user').subscribe((state: IAuthUserState) => {
        this.user.set(state.user);
      }),
    );
  }

  user = signal<IAuthUser | null>(null);

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      scrollToTop();
      this.handleAuthService();
    });
  }

  handleAuthService() {
    const token: string | null = localStorage.getItem('token') ?? null;

    if (!token) {
      this.store.dispatch(
        setAuthUser({
          user: null,
        }),
      );
      return;
    }

    this.authUserService.handleAuthUser().subscribe({
      next: (res: IResponse<IAuthUser>) => {
        this.store.dispatch(
          setAuthUser({
            user: res.data,
          }),
        );
      },
      error: () => {
        this.store.dispatch(
          setAuthUser({
            user: null,
          }),
        );
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
