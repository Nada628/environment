import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.country',
        'tableHeader.notes',
        'tableHeader.settings',
      ],
    };
  }

  // Fetch all of coutries
  getCountry(): Observable<any> {
    const url = `${environment.apiUrl}countries`;
    return this.http.get(url);
  }
  // get country by id
  getCountryById(id: number): Observable<any> {
    const url = `${environment.apiUrl}countries/${id}`;
    return this.http.get<any>(url);
  }
  // Submit country data to the API
  addCountry(coutryData: any): Observable<any> {
    const url = `${environment.apiUrl}countries`;
    return this.http.post(url, coutryData);
  }

  // Update country data 
  updateCountry(coutryData: any): Observable<any> {
    const url = `${environment.apiUrl}countries/${coutryData.id}`;
    return this.http.put(url, coutryData);
  }
  // Delete country by ID
  deleteCountry(id: number): Observable<any> {
    const url = `${environment.apiUrl}countries/${id}`;
    return this.http.delete(url);
  }
}
