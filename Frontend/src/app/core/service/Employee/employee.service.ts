import { inject, Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}
  httpService = inject(HttpService);
  getEmployees(queryObj: any) {
    let paramsSet = new HttpParams()
      .set('page', queryObj.page)
      .set('limit', queryObj.limit);
    if (queryObj.search) {
      paramsSet = paramsSet.set('search', queryObj.search);
    }
    if (queryObj.department) {
      paramsSet = paramsSet.set('department', queryObj.department);
    }
    if (queryObj.sortBy) {
      paramsSet = paramsSet.set('sortBy', queryObj.sortBy);
    }
    return this.httpService.get('employee', paramsSet);
  }

  addEmployee(employeeObj: any) {
    return this.httpService.post('employee', employeeObj);
  }
  updateEmployee(employeeObj: any) {
    return this.httpService.put(`employee/${employeeObj._id}`, employeeObj);
  }
  deleteEmployee(id: string) {
    return this.httpService.delete(`employee/${id}`);
  }
}
