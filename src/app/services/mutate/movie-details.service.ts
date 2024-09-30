import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { IMovieDetails, IResponse } from '../../global/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMovieDetails(id: string): Observable<IResponse<IMovieDetails>> {
    const token: string = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<IResponse<IMovieDetails>>(
      `${this.apiUrl}/movie-details`,
      { id },
      { headers },
    );
  }
}
