import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CityApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.city',
        'tableHeader.notes',
        'tableHeader.country_id',
        'tableHeader.settings',
      ],
    };
  }

  // Fetch all of cities
  getCity(): Observable<any> {
    const url = `${environment.apiUrl}city`;
    return this.http.get(url);
  }
  getCityById(id: number): Observable<any> {
    const url = `${environment.apiUrl}city/${id}`;
    return this.http.get<any>(url);
  }
  // Submit city data to the API
  addCity(cityData: any): Observable<any> {
    const url = `${environment.apiUrl}city`;
    return this.http.post(url, cityData);
  }

  // Update city data 
  updateCity(cityData: any): Observable<any> {
    const url = `${environment.apiUrl}city/${cityData.id}`;
    return this.http.put(url, cityData);
  }
  // Delete city by ID
  deleteCity(id: number): Observable<any> {
    const url = `${environment.apiUrl}city/${id}`;
    return this.http.delete(url);
  }
}
