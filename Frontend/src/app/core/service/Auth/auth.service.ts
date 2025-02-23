import { inject, Injectable, signal } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { iUser } from '../../models/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  httpService = inject(HttpService);
  cookieService = inject(CookieService);
  user = signal<iUser | null>(null);
  login(email: string, password: string) {
    return this.httpService.post('auth/login', { email, password });
  }
  signup(userObj: { name: string; email: string; password: string }) {
    return this.httpService.post('auth/signup', userObj);
  }
  getLoggedInUser() {
    return this.httpService.get('auth/self');
  }
  logout() {
    return this.httpService.post('auth/logout', {});
  }
  refreshAccessToken() {
    return this.httpService.post('auth/refresh-token', {});
  }
  changePassword(password: string, newPassword: string) {
    return this.httpService.put('auth/change-password', {
      password,
      newPassword,
    });
  }
}
