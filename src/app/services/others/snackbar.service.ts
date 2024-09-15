import { Injectable } from '@angular/core';

import { STATUS_TYPE } from '../../global/enums';
import { CineCornSnackbarComponent } from '../../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarComponent!: CineCornSnackbarComponent;
  constructor() {}

  register(snackbarComponent: CineCornSnackbarComponent) {
    this.snackbarComponent = snackbarComponent;
  }

  show(text: string, type: keyof typeof STATUS_TYPE, duration: number = 3000) {
    if (this.snackbarComponent) {
      this.snackbarComponent.text = text;
      this.snackbarComponent.type = type;
      this.snackbarComponent.duration = duration;
      this.snackbarComponent.showSnackbar();
    }
  }

  close() {
    this.snackbarComponent.closeSnackbar();
  }
}
