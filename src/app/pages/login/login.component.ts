import { Component, ElementRef, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { LoginService } from '../../services/mutate';
import { routeConverter } from '../../global/functions';
import { APP_ROUTES, STATUS_TYPE } from '../../global/enums';
import { IError, ILoginResponse, IResponse, ISnackbarState } from '../../global/interfaces';
import { setSnackbar } from '../../store/actions';
import { CineCornCardComponent } from '../../components/card/card.component';
import { CineCornIconComponent } from '../../components/icons/icon.component';

@Component({
  selector: 'cine-corn-login',
  standalone: true,
  imports: [ReactiveFormsModule, CineCornCardComponent, CineCornIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class CineCornLoginComponent {
  usernameInput = viewChild.required<ElementRef<HTMLInputElement>>('usernameInput');
  passwordInput = viewChild.required<ElementRef<HTMLInputElement>>('passwordInput');

  constructor(
    private loginService: LoginService,
    private store: Store<{ snackbar: ISnackbarState }>,
    private router: Router,
  ) {}

  visibility: boolean = false;
  get icon() {
    return this.visibility ? 'visibility' : 'visibility_off';
  }
  get placeholder() {
    return this.visibility ? 'your password' : '*************';
  }
  get type() {
    return this.visibility ? 'text' : 'password';
  }

  handleVisibility() {
    this.visibility = !this.visibility;
  }

  myForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S+$/),
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S+$/),
      Validators.minLength(6),
      Validators.maxLength(16),
    ]),
  });

  get username() {
    return this.myForm.get('username');
  }
  get password() {
    return this.myForm.get('password');
  }

  getErrorMessage(control: AbstractControl | null): string {
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('pattern')) {
      return 'Spaces are not allowed';
    }
    if (control?.hasError('minlength')) {
      const requiredLength: number = control.errors?.['minlength'].requiredLength;
      return `Minimum length is ${requiredLength} characters`;
    }
    if (control?.hasError('maxlength')) {
      const requiredLength: number = control.errors?.['maxlength'].requiredLength;
      return `Maximum length is ${requiredLength} characters`;
    }

    return 'Invalid Input';
  }

  onSubmit() {
    if (this.myForm.invalid) {
      if (this.username?.invalid) {
        this.usernameInput().nativeElement.focus();
      } else if (this.password?.invalid) {
        this.passwordInput().nativeElement.focus();
      }
      this.myForm.markAllAsTouched();
    } else {
      this.loginService
        .login({
          username: this.myForm.value.username!,
          password: this.myForm.value.password!,
        })
        .subscribe({
          next: (res: IResponse<ILoginResponse>) => {
            this.store.dispatch(
              setSnackbar({
                open: true,
                text: res.message,
                statusType: STATUS_TYPE.success,
              }),
            );
            localStorage.setItem('token', res.data.token ?? '');
            this.myForm.reset();
            this.router.navigate([routeConverter(APP_ROUTES.home)]);
          },
          error: (err: IError) => {
            this.store.dispatch(
              setSnackbar({
                open: true,
                text: err.error.message,
                statusType: STATUS_TYPE.error,
              }),
            );
          },
        });
    }
  }
}
