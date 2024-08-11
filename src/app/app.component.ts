import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CineCornHeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CineCornHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cine-corn-fe';
}
