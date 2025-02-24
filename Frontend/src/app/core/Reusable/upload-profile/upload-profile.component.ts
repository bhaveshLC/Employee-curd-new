import { ConfirmationService } from './../../service/Confirmation/confirmation.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/Auth/auth.service';
import { ToastService } from '../../service/toast/toast.service';
import { UserService } from './../../service/User/user.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-upload-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-profile.component.html',
  styleUrl: './upload-profile.component.css',
})
export class UploadProfileComponent {
  userService = inject(UserService);
  toastService = inject(ToastService);
  authService = inject(AuthService);
  confirmationService = inject(ConfirmationService);
  closeModal() {
    const modal = document.getElementById('upload-profile-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
    this.isEdit = false;
  }
  profileImage: File | null = null;
  isLoading: boolean = false;
  isEdit: boolean = false;
  onImageChange(e: any) {
    this.profileImage = e.target.files[0];
  }
  uploadProfile() {
    this.isLoading = true;
    this.userService.uploadProfile(this.profileImage).subscribe({
      next: (res: any) => {
        const user = this.authService.user();
        if (user) {
          user.profilePicture = res.profile;
        }
        this.toastService.getToast('success', 'Successfully Uploaded Profile.');
        this.closeModal();
        this.isEdit = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.getToast('error', err.error.message);
      },
    });
  }
  async onDelete() {
    const confirmed = await this.confirmationService.isConfirm(
      'Are you sure?',
      "You won't be able to revert this!"
    );
    if (confirmed) {
      this.userService.removeProfile().subscribe({
        next: () => {
          this.toastService.getToast(
            'success',
            'Profile deleted successfully.'
          );
          const user = this.authService.user();
          if (user) {
            user.profilePicture = '';
          }
          this.closeModal();
        },
        error: (err) => {
          this.toastService.getToast('error', err.error.message);
        },
      });
    }
  }
}
// Hello Team,
// Today, I created an API for uploading user profile to Cloudinary and also created a user profile page that with functionalities for replace/delete user profile, and update user information.
