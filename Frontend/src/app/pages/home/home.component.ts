import { ThemeService } from './../../core/service/Theme/theme.service';
import { LoaderComponent } from './../../core/shared/loader/loader.component';
import { FormsModule } from '@angular/forms';
import { Component, HostListener, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AddEmployeeComponent } from '../../core/Reusable/add-employee/add-employee.component';
import { iEmployee } from '../../core/models/interface';
import { EditEmployeeComponent } from '../../core/Reusable/edit-employee/edit-employee.component';
import Swal from 'sweetalert2';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { AuthService } from '../../core/service/Auth/auth.service';
import { EmployeeService } from '../../core/service/Employee/employee.service';
import { FilterComponent } from '../components/filter/filter.component';
import { ConfirmationService } from '../../core/service/Confirmation/confirmation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AddEmployeeComponent,
    EditEmployeeComponent,
    PaginationComponent,
    LoaderComponent,
    CurrencyPipe,
    FilterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  employeeService = inject(EmployeeService);
  authService = inject(AuthService);
  confirmationService = inject(ConfirmationService);
  themeService = inject(ThemeService);
  router = inject(Router);
  employees: iEmployee[] = [];
  selectedEmployee: iEmployee | null = null;
  isLoading: boolean = false;
  totalEmployees: number = 0;
  queryObj = {
    page: 1,
    limit: 5,
    search: '',
    department: '',
    sortBy: '',
  };
  page: number[] = [];

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.isLoading = true;
    this.employeeService.getEmployees(this.queryObj).subscribe({
      next: (res: any) => {
        this.employees = res.employees;
        this.page = Array.from({ length: res.totalPages }, (_, i) => i + 1);
        this.isLoading = false;
        this.selectedEmployee = null;
        this.totalEmployees = res.totalEmployees;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }
  updateFilters(updatedQueryObj: any): void {
    this.queryObj = { ...updatedQueryObj };
    this.getEmployees();
  }
  onPageChange(page: any) {
    this.queryObj.page = page;
    this.getEmployees();
  }
  openModal() {
    const modal = document.getElementById('add-employee-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }
  editEmployee(employee: iEmployee) {
    this.selectedEmployee = employee;
    const modal = document.getElementById('edit-employee-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }
  async deleteEmployee(id: string) {
    const isConfirmed = await this.confirmationService.isConfirm(
      'Are you sure?',
      'You will not able to recover this employee'
    );
    if (isConfirmed) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          if (
            this.totalEmployees % this.queryObj.limit == 1 &&
            this.queryObj.page != 1
          ) {
            this.queryObj.page--;
          }
          this.getEmployees();
          Swal.fire({
            title: 'Deleted!',
            text: 'Employee has been deleted.',
            icon: 'success',
            background: this.themeService.backgroundColor(),
            color: this.themeService.textColor(),
          });
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            title: 'Error!',
            text: error.error.message,
            icon: 'error',
            background: this.themeService.backgroundColor(),
            color: this.themeService.textColor(),
          });
        },
      });
    }
  }
}
