import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/service/Auth/auth.service';
import { EditUserComponent } from '../../core/Reusable/edit-user/edit-user.component';
import { CommonModule } from '@angular/common';
import { UploadProfileComponent } from '../../core/Reusable/upload-profile/upload-profile.component';
import { LoaderComponent } from '../../core/shared/loader/loader.component';
import { ToastService } from '../../core/service/toast/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    EditUserComponent,
    CommonModule,
    UploadProfileComponent,
    LoaderComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  authService = inject(AuthService);
  openEditUserModal() {
    const modal = document.getElementById('edit-user-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }
  openUploadProfile() {
    const modal = document.getElementById('upload-profile-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }
}
