import { Component, signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { CineCornSnackbarComponent } from './components/snackbar/snackbar.component';
import { CineCornHeaderComponent } from './components/header/header.component';
import { CineCornFooterComponent } from './components/footer/footer.component';
import { scrollToTop } from './global/functions';
import { SnackbarService } from './services/others/snackbar.service';
import { AuthUserService } from './services/query';
import { IAuthUser, IError, IResponse } from './global/interfaces';

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

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private authUserService: AuthUserService,
  ) {}

  user = signal<IAuthUser | null>(null);

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        scrollToTop();
      }
    });
    this.handleAuthService();
  }

  ngAfterViewInit() {
    this.snackbarService.register(this.snackbarComponent);
  }

  handleAuthService() {
    this.authUserService.handleAuthUser().subscribe({
      next: (res: IResponse<IAuthUser>) => {
        this.user.set(res.data);
      },
      error: (err: IError) => {
        this.user.set(null);
      },
    });
  }
}
