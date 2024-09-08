import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovieDetails, IResponse } from '../../global/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMovieDetails(id: string): Observable<IResponse<IMovieDetails>> {
    return this.http.post<IResponse<IMovieDetails>>(`${this.apiUrl}/movie-details`, { id });
  }
}
