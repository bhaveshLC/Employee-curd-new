import { Component, inject, Input } from '@angular/core';
import { iUser } from '../../models/interface';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/User/user.service';
import { ToastService } from '../../service/toast/toast.service';
import { AuthService } from '../../service/Auth/auth.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  @Input() user: any;
  userService = inject(UserService);
  toastService = inject(ToastService);
  authService = inject(AuthService);
  closeModal() {
    const modal = document.getElementById('edit-user-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }
  onUpdate() {
    const userData = { name: this.user.name, email: this.user.email };
    this.userService.updateUser(userData).subscribe({
      next: (res: any) => {
        this.closeModal();
        this.toastService.getToast('success', 'User Updated Successfully');
        this.authService.user.set(res);
      },
      error: (err) => {
        this.toastService.getToast('error', err.error.message);
      },
    });
  }
}
