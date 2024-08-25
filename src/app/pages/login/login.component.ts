import { Component } from '@angular/core';
import { CineCornCardComponent } from '../../components/card/card.component';

@Component({
  selector: 'cine-corn-login',
  standalone: true,
  imports: [CineCornCardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class CineCornLoginComponent {}
