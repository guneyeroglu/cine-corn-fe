import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { CineCornHeaderComponent } from './components/header/header.component';
import { CineCornFooterComponent } from './components/footer/footer.component';
import { scrollToTop } from './global/functions';

@Component({
  selector: 'cine-corn-app',
  standalone: true,
  imports: [RouterOutlet, CineCornHeaderComponent, CineCornFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class CineCornAppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        scrollToTop();
      }
    });
  }
}
