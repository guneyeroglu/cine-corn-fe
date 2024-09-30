import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { IResponse } from '../../global/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ToggleFavoriteService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  toggleFavorite(movieId?: string): Observable<IResponse> {
    const token: string = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<IResponse>(`${this.apiUrl}/favorites`, { movieId }, { headers });
  }
}
