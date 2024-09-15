import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { IAuthUser, IResponse } from '../../global/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  handleAuthUser(): Observable<IResponse<IAuthUser>> {
    const token: string = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<IResponse<IAuthUser>>(`${this.apiUrl}/auth-user`, { headers });
  }
}
