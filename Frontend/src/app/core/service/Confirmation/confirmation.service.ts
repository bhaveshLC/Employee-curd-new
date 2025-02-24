import { inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ThemeService } from '../Theme/theme.service';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  themeService = inject(ThemeService);
  constructor() {}
  async isConfirm(title: string, text: string) {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: this.themeService.backgroundColor(),
      color: this.themeService.textColor(),
    });
    return result.isConfirmed;
  }
}
