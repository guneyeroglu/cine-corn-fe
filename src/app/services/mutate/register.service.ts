import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { IRegister, IResponse } from '../../global/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  register(user: IRegister): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.apiUrl}/register`, { ...user });
  }
}
