import { AuthService } from './../../service/Auth/auth.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../../shared/passwordValidation/passwordMatchValidator';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../service/toast/toast.service';
import { UserService } from '../../service/User/user.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  userService = inject(UserService);
  toastService = inject(ToastService);
  changePasswordForm = new FormGroup(
    {
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: [passwordMatchValidator] }
  );
  closeModal() {
    const modal = document.getElementById('change-password-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
    this.changePasswordForm.reset();
  }
  onUpdatePassword() {
    const password = this.changePasswordForm.get('oldPassword')?.value!;
    const newPassword = this.changePasswordForm.get('password')?.value!;
    this.userService.changePassword(password, newPassword).subscribe({
      next: () => {
        this.closeModal();
        this.toastService.getToast('success', 'Password Updated Successfully');
        this.changePasswordForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.toastService.getToast('error', err.error.message);
      },
    });
  }
}
