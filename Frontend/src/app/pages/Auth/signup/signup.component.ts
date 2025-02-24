import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../../core/shared/passwordValidation/passwordMatchValidator';
import { passwordStrength } from '../../../core/shared/passwordValidation/passwordStrength';
import { AuthService } from '../../../core/service/Auth/auth.service';
import { ToastService } from '../../../core/service/toast/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  authService = inject(AuthService);
  toastService = inject(ToastService);
  router = inject(Router);
  isLoading: boolean = false;
  signupForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        passwordStrength(),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: [passwordMatchValidator] }
  );
  onSubmit() {
    this.isLoading = true;
    const signUpObj = {
      name: this.signupForm.value.name!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!,
    };
    this.authService.signup(signUpObj).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/login');
        this.toastService.getToast('success', 'User Registered Successfully');
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.toastService.getToast('error', err.error.message);
      },
    });
  }
}
