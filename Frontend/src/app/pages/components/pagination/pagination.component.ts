import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() totalPages: number[] = [];
  @Input() currentPage: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
  pages: number[] = [];
}
