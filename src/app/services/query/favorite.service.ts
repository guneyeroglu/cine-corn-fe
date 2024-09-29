import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { IMovie, IResponse } from '../../global/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getFavoriteMovies(): Observable<IResponse<IMovie[]>> {
    const token: string = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<IResponse<IMovie[]>>(`${this.apiUrl}/favorites`, { headers });
  }
}
