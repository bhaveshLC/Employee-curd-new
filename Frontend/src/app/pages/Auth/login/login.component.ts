import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/service/Auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../core/service/toast/toast.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  toastService = inject(ToastService);
  router = inject(Router);
  isLoading: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  ngOnInit(): void {}
  onLogin() {
    this.isLoading = true;
    const loginObj = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };
    this.authService.login(loginObj.email, loginObj.password).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.toastService.getToast('success', 'Login Successful');
        this.router.navigateByUrl('');
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.getToast('error', err.error.message);
        console.log('Error in Login', err);
      },
    });
  }
}
