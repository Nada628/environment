import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HarborApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.harbor',
        'tableHeader.code',
        'tableHeader.harbor_type',
        'tableHeader.country_id',
        'tableHeader.settings',
      ],
    };
  }
  getCountry(): Observable<any> {
    const url = `${environment.apiUrl}countries`;
    return this.http.get(url);
  }
// get country by id
getCountryById(id: number): Observable<any> {
  const url = `${environment.apiUrl}countries/${id}`;
  return this.http.get<any>(url);
}

  // Fetch all 
  getAll(): Observable<any> {
    const url = `${environment.apiUrl}harbor`;
    return this.http.get(url);
  }
  getoneById(id: number): Observable<any> {
    const url = `${environment.apiUrl}harbor/${id}`;
    return this.http.get<any>(url);
  }
  // Submit
  add(Data: any): Observable<any> {
    const url = `${environment.apiUrl}harbor`;
    return this.http.post(url, Data);
  }

  // Update  
  update(Data: any): Observable<any> {
    const url = `${environment.apiUrl}harbor/${Data.id}`;
    return this.http.put(url, Data);
  }
  // Delete 
  delete(id: number): Observable<any> {
    const url = `${environment.apiUrl}harbor/${id}`;
    return this.http.delete(url);
  }
}
