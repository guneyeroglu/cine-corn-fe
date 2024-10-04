import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { IMovie, IResponse } from '../../global/interfaces';
import { MOVIE_TYPE } from '../../global/enums';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllMovies(type?: keyof typeof MOVIE_TYPE): Observable<IResponse<IMovie[]>> {
    const token: string = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params: any = {};

    switch (type) {
      case MOVIE_TYPE.isFeatured:
        params.isFeatured = true;
        break;
      case MOVIE_TYPE.isNew:
        params.isNew = true;
        break;
      default:
        break;
    }
    return this.http.get<IResponse<IMovie[]>>(`${this.apiUrl}/movies`, { params, headers });
  }
}
