import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const accessToken = cookieService.get('accessToken');
  if (!accessToken) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
