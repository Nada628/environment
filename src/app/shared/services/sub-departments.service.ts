import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SubDepartmentsApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.subDepartmentName',
        'tableHeader.mainDepartment',
        'tableHeader.departmentDescription',
        'tableHeader.settings',
      ],
    };
  }

  // Fetch all of sub-departments
  getAll(): Observable<any> {
    const url = `${environment.apiUrl}sub-department`;
    return this.http.get(url);
  }
  // Fetch data by ID
  getOneById(id: number): Observable<any> {
    const url = `${environment.apiUrl}sub-department/${id}`;
    return this.http.get(url);
  }
  // Submit department data to the API
  addSubDepartment(subDepartmentData: any): Observable<any> {
    const url = `${environment.apiUrl}sub-department`;
    return this.http.post(url, subDepartmentData);
  }
  // Update department data (for editing an existing department)
  updateSubDepartment(subDepartmentData: any): Observable<any> {
    const url = `${environment.apiUrl}sub-department/${subDepartmentData.id}`;
    return this.http.post(url, subDepartmentData);
  }
  // Delete department by ID
  deleteSubDepartment(id: number): Observable<any> {
    const url = `${environment.apiUrl}sub-department/${id}`;
    return this.http.delete(url);
  }
}
