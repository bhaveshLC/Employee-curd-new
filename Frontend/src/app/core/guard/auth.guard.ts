import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const accessToken = cookieService.get('accessToken');
  if (accessToken) {
    router.navigateByUrl('');
    return false;
  }
  return true;
};
