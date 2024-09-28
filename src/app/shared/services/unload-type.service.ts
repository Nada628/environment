import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UnLoadTypeApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.unloadType',
        'tableHeader.notes',
        'tableHeader.price',
        'tableHeader.form_type',
        'tableHeader.settings',
      ],
    };
  }

  // Fetch all 
  getAll(): Observable<any> {
    const url = `${environment.apiUrl}unload-type`;
    return this.http.get(url);
  }
  getoneById(id: number): Observable<any> {
    const url = `${environment.apiUrl}unload-type/${id}`;
    return this.http.get<any>(url);
  }
  // Submit
  add(Data: any): Observable<any> {
    const url = `${environment.apiUrl}unload-type`;
    return this.http.post(url, Data);
  }

  // Update  
  update(Data: any): Observable<any> {
    const url = `${environment.apiUrl}unload-type/${Data.id}`;
    return this.http.put(url, Data);
  }
  // Delete 
  delete(id: number): Observable<any> {
    const url = `${environment.apiUrl}unload-type/${id}`;
    return this.http.delete(url);
  }
}
