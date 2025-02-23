import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Environment } from '../../Environment/environment';
// const API_URL = 'http://localhost:8000';
const API_URL = Environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}
  http = inject(HttpClient);
  get(endpoint: string, queryObj?: HttpParams) {
    return this.http.get(`${API_URL}/${endpoint}`, {
      params: queryObj,
      withCredentials: true,
    });
  }
  post(endpoint: string, payload: any) {
    return this.http
      .post(`${API_URL}/${endpoint}`, payload, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          return throwError(error);
        })
      );
  }
  put(endpoint: string, payload: any) {
    return this.http.put(`${API_URL}/${endpoint}`, payload, {
      withCredentials: true,
    });
  }
  delete(endpoint: string) {
    return this.http.delete(`${API_URL}/${endpoint}`, {
      withCredentials: true,
    });
  }
}
