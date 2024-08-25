import { Component } from '@angular/core';
import { CineCornCardComponent } from '../../components/card/card.component';

@Component({
  selector: 'cine-corn-register',
  standalone: true,
  imports: [CineCornCardComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class CineCornRegisterComponent {}
