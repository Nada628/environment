import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CompanyActivityApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.activity',
        'tableHeader.desc',
        'tableHeader.company_type_name',
        'tableHeader.settings',
      ],
    };
  }

  // Fetch all 
  getAll(): Observable<any> {
    const url = `${environment.apiUrl}company-type/activity/index`;
    return this.http.get(url);
  }
  getoneById(id: number): Observable<any> {
    const url = `${environment.apiUrl}company-type/activity/${id}`;
    return this.http.get<any>(url);
  }
  // Submit
  add(Data: any): Observable<any> {
    const url = `${environment.apiUrl}company-type/activity/create`;
    return this.http.post(url, Data);
  }

  // Update  
  update(Data: any): Observable<any> {
    const url = `${environment.apiUrl}company-type/activity/${Data.id}`;
    return this.http.post(url, Data);
  }
  // Delete 
  delete(id: number): Observable<any> {
    const url = `${environment.apiUrl}company-type/activity/${id}`;
    return this.http.delete(url);
  }

  getAllCompanyType(): Observable<any> {
    const url = `${environment.apiUrl}get/company/types`;
    return this.http.get(url);
  }
  
}
