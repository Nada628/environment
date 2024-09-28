import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ServiceApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.service',
        'tableHeader.departmentName',
        'tableHeader.desc',
        'tableHeader.settings',
      ],
    };
  }

// Fetch departments
getDepartments(): Observable<any> {
  const url = `${environment.apiUrl}departments`;
  return this.http.get(url);
}
  // Fetch all 
  getAll(): Observable<any> {
    const url = `${environment.apiUrl}service`;
    return this.http.get(url);
  }
  // Fetch one data by ID
  getOneById(id: number): Observable<any> {
    const url = `${environment.apiUrl}service/${id}`;
    return this.http.get<any>(url);
  }
  // Submit data to the API
  add(data: any): Observable<any> {
    const url = `${environment.apiUrl}service`;
    return this.http.post(url, data);
  }
  // Update data 
  update(id: number, data: any): Observable<any> {
    const url = `${environment.apiUrl}service/${id}`;
    return this.http.put(url, data);
  }
  
  // Delete by ID
  delete(id: number): Observable<any> {
    const url = `${environment.apiUrl}service/${id}`; 
    return this.http.delete(url);
  }
}
