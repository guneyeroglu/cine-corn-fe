import { Component, ElementRef, viewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { RegisterService } from '../../services/mutate';
import { IError, IResponse, ISnackbarState } from '../../global/interfaces';
import { STATUS_TYPE } from '../../global/enums';
import { setSnackbar } from '../../store/actions';
import { CineCornCardComponent } from '../../components/card/card.component';
import { CineCornIconComponent } from '../../components/icons/icon.component';

@Component({
  selector: 'cine-corn-register',
  standalone: true,
  imports: [ReactiveFormsModule, CineCornCardComponent, CineCornIconComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class CineCornRegisterComponent {
  usernameInput = viewChild.required<ElementRef<HTMLInputElement>>('usernameInput');
  passwordInput = viewChild.required<ElementRef<HTMLInputElement>>('usernameInput');
  confirmPasswordInput = viewChild.required<ElementRef<HTMLInputElement>>('usernameInput');

  constructor(
    private registerService: RegisterService,
    private store: Store<{ snackbar: ISnackbarState }>,
  ) {}

  visibilityPassword: boolean = false;
  visibilityConfirmPassword: boolean = false;

  get passwordIcon() {
    return this.visibilityPassword ? 'visibility' : 'visibility_off';
  }
  get passwordPlaceholder() {
    return this.visibilityPassword ? 'your password' : '*************';
  }
  get passwordType() {
    return this.visibilityPassword ? 'text' : 'password';
  }

  handleVisibilityPassword() {
    this.visibilityPassword = !this.visibilityPassword;
  }

  get confirmPasswordIcon() {
    return this.visibilityConfirmPassword ? 'visibility' : 'visibility_off';
  }
  get confirmPasswordPlaceholder() {
    return this.visibilityConfirmPassword ? 'your password' : '*************';
  }
  get confirmPasswordType() {
    return this.visibilityConfirmPassword ? 'text' : 'password';
  }

  handleVisibilityConfirmPassword() {
    this.visibilityConfirmPassword = !this.visibilityConfirmPassword;
  }

  myForm = new FormGroup(
    {
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
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\S+$/),
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
    },
    {
      validators: this.passwordMatchValidator,
    },
  );

  get username() {
    return this.myForm.get('username');
  }
  get password() {
    return this.myForm.get('password');
  }
  get confirmPassword() {
    return this.myForm.get('confirmPassword');
  }

  passwordMatchValidator(groupControl: AbstractControl): { passwordMatch: boolean } | null {
    const password: AbstractControl<any, any> | null = groupControl.get('password');
    const confirmPassword: AbstractControl<any, any> | null = groupControl.get('confirmPassword');
    const passwordMatch: boolean = password?.value === confirmPassword?.value;

    if (!passwordMatch) {
      confirmPassword?.setErrors({ ...confirmPassword.errors, passwordMatch: true });

      return { passwordMatch: true };
    } else {
      if (confirmPassword?.errors) {
        const { passwordMatch, ...otherErrors } = confirmPassword?.errors;
        confirmPassword?.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
      }

      return null;
    }
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
    if (control?.hasError('passwordMatch')) {
      return `Password and confirm password are not matching`;
    }

    return 'Invalid Input';
  }

  onSubmit() {
    if (this.myForm.invalid) {
      if (this.username?.invalid) {
        this.usernameInput().nativeElement.focus();
      } else if (this.password?.invalid) {
        this.passwordInput().nativeElement.focus();
      } else if (this.confirmPassword?.invalid) {
        this.confirmPasswordInput().nativeElement.focus();
      }
      this.myForm.markAllAsTouched();
    } else {
      this.registerService
        .register({
          username: this.myForm.value.username!,
          password: this.myForm.value.password!,
        })
        .subscribe({
          next: (res: IResponse) => {
            this.store.dispatch(
              setSnackbar({
                open: true,
                text: res.message,
                statusType: STATUS_TYPE.success,
              }),
            );
            this.myForm.reset();
            this.visibilityPassword = false;
            this.visibilityConfirmPassword = false;
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
