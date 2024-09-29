import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { IMovie, IResponse } from '../../global/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getListMovies(): Observable<IResponse<IMovie[]>> {
    const token: string = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<IResponse<IMovie[]>>(`${this.apiUrl}/my-list`, { headers });
  }
}
