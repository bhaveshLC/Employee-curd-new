import { Component, HostListener, inject } from '@angular/core';
import { AuthService } from '../../../core/service/Auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/service/Theme/theme.service';
import { ChangePasswordComponent } from '../../../core/Reusable/change-password/change-password.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ChangePasswordComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  router = inject(Router);
  isDropdownOpen: boolean = false;
  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe((res: any) => {
      this.authService.user.set(res);
    });
  }
  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
    });
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  openChangePasswordModal() {
    this.isDropdownOpen = false;
    const modal = document.getElementById('change-password-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }
  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDropdownOpen = false;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = document.getElementById('dropdown');
    const button = document.getElementById('dropdownDefaultButton');
    if (
      this.isDropdownOpen &&
      dropdown &&
      button &&
      !dropdown.contains(target) &&
      !button.contains(target)
    ) {
      this.isDropdownOpen = false;
    }
  }
}
