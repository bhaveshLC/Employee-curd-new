import { inject, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ThemeService } from '../Theme/theme.service';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}
  themeService = inject(ThemeService);
  getToast(
    typeIcon: 'success' | 'error' | 'warning' | 'info',
    msg: string,
    timerProgressBar: boolean = false
  ) {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: typeIcon,
      timerProgressBar,
      timer: 3000,
      title: msg,
      background: this.themeService.backgroundColor(),
      color: this.themeService.textColor(),
    });
  }
}
