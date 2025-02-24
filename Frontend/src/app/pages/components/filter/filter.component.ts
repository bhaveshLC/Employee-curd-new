import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Environment } from '../../../core/Environment/environment';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  departments: string[] = Environment.departments; 
  @Input() page: number[] = []; 
  @Input() queryObj = {
      page: 1,
      limit: 5,
      search: '',
      department: '',
      sortBy: '',
  };

  @Output() getEmployee = new EventEmitter<any>(); 

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(500), takeUntil(this.destroy$)).subscribe((searchValue) => {
      this.queryObj.search = searchValue;
      this.getEmployee.emit({ ...this.queryObj }); // Emit after debounce
    });
  }

  onSearchChange(event: string): void {
    this.searchSubject.next(event); 
  }

  onFilterChange(): void {
    this.queryObj.page = 1;
    this.getEmployee.emit({ ...this.queryObj }); 
  }

  onPageChange(page: number): void {
    this.queryObj.page = page;
    this.getEmployee.emit({ ...this.queryObj });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
