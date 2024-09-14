import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { CineCornSnackbarComponent } from './components/snackbar/snackbar.component';
import { CineCornHeaderComponent } from './components/header/header.component';
import { CineCornFooterComponent } from './components/footer/footer.component';
import { scrollToTop } from './global/functions';
import { SnackbarService } from './services/others/snackbar.service';

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
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        scrollToTop();
      }
    });
  }

  ngAfterViewInit() {
    this.snackbarService.register(this.snackbarComponent);
  }
}
