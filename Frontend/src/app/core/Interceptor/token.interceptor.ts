import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, of, Subject, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../service/Auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast/toast.service';

const refreshTokenSubject = new Subject<void>();
let isRefreshing = false;

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (isRefreshing) {
          return refreshTokenSubject.pipe(switchMap(() => next(req)));
        }
        isRefreshing = true;
        refreshTokenSubject.next();
        return authService.refreshAccessToken().pipe(
          switchMap((newAccessToken: any) => {
            isRefreshing = false;
            refreshTokenSubject.next();
            return next(req);
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            authService.logout().subscribe(() => {
              toastService.getToast('error', 'Session Expired');
              router.navigateByUrl('/login');
            });
            return of(refreshError);
          })
        );
      }
      throw error;
    })
  );
};
