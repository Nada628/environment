import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.departmentName',
        'tableHeader.departmentDescription',
        'tableHeader.createDate',
        'tableHeader.settings',
      ],
    };
  }

  // Fetch all of departments
  getDepartments(): Observable<any> {
    const url = `${environment.apiUrl}departments`;
    return this.http.get(url);
  }
  // Fetch department data by ID
  getDepartmentById(id: number): Observable<any> {
    const url = `${environment.apiUrl}departments/${id}`;
    return this.http.get(url);
  }
  // Submit department data to the API
  addDepartment(departmentData: any): Observable<any> {
    const url = `${environment.apiUrl}departments`;
    return this.http.post(url, departmentData);
  }
  // Update department data (for editing an existing department)
  updateDepartment(departmentData: any): Observable<any> {
    const url = `${environment.apiUrl}departments/${departmentData.id}`;
    return this.http.put(url, departmentData);
  }
  // Delete department by ID
  deleteDepartment(id: number): Observable<any> {
    const url = `${environment.apiUrl}departments/${id}`;
    return this.http.delete(url);
  }
}
