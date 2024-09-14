import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { ILogin, ILoginResponse, IResponse } from '../../global/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(user: ILogin): Observable<IResponse<ILoginResponse>> {
    return this.http.post<IResponse<ILoginResponse>>(`${this.apiUrl}/login`, { ...user });
  }
}
