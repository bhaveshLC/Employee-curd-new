import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { iEmployee } from '../../models/interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../service/toast/toast.service';
import { EmployeeService } from '../../service/Employee/employee.service';
import { Environment } from '../../Environment/environment';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css',
})
export class EditEmployeeComponent implements OnChanges {
  @Input() employee: iEmployee | null = null;
  @Output() getEmployee: EventEmitter<iEmployee> = new EventEmitter();
  employeeService = inject(EmployeeService);
  toastService = inject(ToastService);
  // departments: string[] = ['HR', 'Engineering', 'Sales', 'Marketing', 'Others'];
  departments: string[] = Environment.departments;
  editedEmployee: iEmployee = {
    _id: '',
    name: '',
    email: '',
    department: '',
    salary: 0,
    addedBy: '',
  };
  ngOnChanges(): void {
    if (this.employee) {
      this.editedEmployee = { ...this.employee };
    }
  }
  closeModal() {
    const modal = document.getElementById('edit-employee-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
    this.editedEmployee = {
      _id: this.employee?._id!,
      name: this.employee?.name!,
      email: this.employee?.email!,
      department: this.employee?.department!,
      salary: this.employee?.salary!,
      addedBy: this.employee?.addedBy
    };
  }
  onUpdate() {
    this.employeeService.updateEmployee(this.editedEmployee).subscribe({
      next: (res) => {
        this.getEmployee.emit();
        this.closeModal();
        this.toastService.getToast('success', 'Employee updated successfully');
      },
      error: (error) => {
        console.error('Error updating employee', error);
        this.toastService.getToast('error', error.error.message);
      },
    });
  }
}
