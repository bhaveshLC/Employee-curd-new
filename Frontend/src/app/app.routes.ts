import { Routes } from '@angular/router';
import { LoginComponent } from './pages/Auth/login/login.component';
import { SignupComponent } from './pages/Auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guard/auth.guard';
import { authenticationGuard } from './core/guard/authentication.guard';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    canActivate: [authenticationGuard],
    component: LayoutComponent,
    children:[
      {
        path:'',
        component: HomeComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },
];
