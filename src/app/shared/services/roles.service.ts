import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RolesApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.role',
        'tableHeader.settings',
      ],
    };
  }

  // Fetch all roles
  getAll(): Observable<any> {
    const url = `${environment.apiUrl}roles/index`;
    return this.http.get(url);
  }

  // Submit data to the API
  add(data: any): Observable<any> {
    const url = `${environment.apiUrl}roles`;
    return this.http.post(url, data);
  }
  getoneById(id: number): Observable<any> {
    const url = `${environment.apiUrl}role/${id}`;
    return this.http.get<any>(url);
  }
  //Update
  update(roleData: any): Observable<any> {
    const url = `${environment.apiUrl}role/${roleData.id}`;
    return this.http.post(url, roleData);
  }
  
  delete(id: number): Observable<any> {
    const url = `${environment.apiUrl}role/${id}`; 
    return this.http.delete(url);
  }
    //get all permisions
    getAllPermissions(): Observable<any> {
      const url = `${environment.apiUrl}permission/index`;
      return this.http.get(url);
    }


}
