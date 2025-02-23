import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../service/toast/toast.service';
import { iEmployee } from '../../models/interface';
import { EmployeeService } from '../../service/Employee/employee.service';
import { Environment } from '../../Environment/environment';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  employeeService = inject(EmployeeService);
  toastService = inject(ToastService);
  @Output() getEmployee: EventEmitter<iEmployee> = new EventEmitter();
  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', Validators.required),
    salary: new FormControl('', [Validators.required, Validators.min(1)]),
  });
  // departments: string[] = ['HR', 'Engineering', 'Sales', 'Marketing', 'Others'];
  departments: string[] = Environment.departments;
  closeModal() {
    const modal = document.getElementById('add-employee-modal');
    if (modal) {
      modal.classList.add('hidden');
      this.employeeForm.reset();
    }
  }
  onSubmit() {
    const employeeData = this.employeeForm.value;
    this.employeeService.addEmployee(employeeData).subscribe({
      next: (res) => {
        this.closeModal();
        this.toastService.getToast('success', 'Employee added successfully');
        this.employeeForm.reset();
        this.getEmployee.emit();
      },
      error: (error) => {
        console.error('Error adding employee', error);
        this.toastService.getToast('error', error.error.message);
      },
    });
  }
}
