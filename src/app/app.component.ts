import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CineCornHeaderComponent } from './components/header/header.component';
import { CineCornFooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'cine-corn-app',
  standalone: true,
  imports: [RouterOutlet, CineCornHeaderComponent, CineCornFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class CineCornAppComponent {
  title = 'cine-corn-fe';
}
