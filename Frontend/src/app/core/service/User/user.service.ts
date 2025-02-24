import { inject, Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  httpService = inject(HttpService);
  changePassword(password: string, newPassword: string) {
    return this.httpService.put('user/change-password', {
      password,
      newPassword,
    });
  }
  updateUser(userData: { name: string; email: string }) {
    return this.httpService.put('user', userData);
  }
  uploadProfile(profileImage: any) {
    const formData = new FormData();
    formData.append('profile', profileImage);
    return this.httpService.put('user/upload-profile', formData);
  }
  removeProfile() {
    return this.httpService.delete('user/profile');
  }
}
