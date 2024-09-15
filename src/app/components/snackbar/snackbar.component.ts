import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ISnackbarState } from '../../global/interfaces';
import { onCloseSnackbar } from '../../store/actions';

@Component({
  selector: 'cine-corn-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class CineCornSnackbarComponent {
  private timeoutId: any;
  private subscription: Subscription = new Subscription();
  constructor(private store: Store<{ snackbar: ISnackbarState }>) {
    this.subscription.add(
      this.store.select('snackbar').subscribe((state: ISnackbarState) => {
        this.snackbarState = state;

        if (this.snackbarState.open) {
          this.showSnackbar();
        }
      }),
    );
  }

  snackbarState!: ISnackbarState;

  showSnackbar() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.closeSnackbar();
    }, this.snackbarState.duration);
  }

  closeSnackbar() {
    this.store.dispatch(onCloseSnackbar());
    clearTimeout(this.timeoutId);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    clearTimeout(this.timeoutId);
  }
}
