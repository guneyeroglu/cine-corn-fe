import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { STATUS_TYPE } from '../../global/enums';

@Component({
  selector: 'cine-corn-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class CineCornSnackbarComponent {
  @Input() open!: boolean;
  @Input() text!: string;
  @Input() type!: keyof typeof STATUS_TYPE;
  @Input() duration!: number;

  private timeoutId: any;

  showSnackbar() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.closeSnackbar();
    }

    this.open = true;

    this.timeoutId = setTimeout(() => {
      this.closeSnackbar();
      console.log('girdi');
    }, this.duration);
  }

  closeSnackbar() {
    this.open = false;
    clearTimeout(this.timeoutId);
  }
}
