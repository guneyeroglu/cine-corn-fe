import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IAuthUserState } from '../../global/interfaces';
import { routeConverter } from '../../global/functions';
import { APP_ROUTES } from '../../global/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token: string | null = localStorage.getItem('token') ?? null;

    if (token) {
      this.router.navigate([routeConverter(APP_ROUTES.home)]);
      return false;
    } else {
      return true;
    }
  }
}
