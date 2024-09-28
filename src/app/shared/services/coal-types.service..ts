import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CoalTypesApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.name',
        'tableHeader.Code',
        'tableHeader.ratioPrice',
        'tableHeader.departmentName',
        'tableHeader.subDepartmentName',
        'tableHeader.Percentage',
        'tableHeader.settings',
      ],
    };
  }
  // Fetch departments for department name type
getDepartments(): Observable<any> {
    const url = `${environment.apiUrl}departments`;
    return this.http.get(url);
  }

  // Fetch all of coal-types
  getCoalTypes(): Observable<any> {
    const url = `${environment.apiUrl}coal/types`;
    return this.http.get(url);
  }
  // Fetch coal type data by ID
  getCoalTypeById(id: number): Observable<any> {
    const url = `${environment.apiUrl}coal/types/${id}`;
    return this.http.get(url);
  }
  // Submit coal type data to the API
  addCoalType(CoalTypeData: any): Observable<any> {
    const url = `${environment.apiUrl}coal/types`;
    return this.http.post(url, CoalTypeData);
  }
  // Update coal Type data
  updateCoalType(CoalTypeData: any): Observable<any> {
    const url = `${environment.apiUrl}coal/types/${CoalTypeData.id}`;
    return this.http.put(url, CoalTypeData);
  }
  // Delete coal Type by ID
  deleteCoalType(id: number): Observable<any> {
    const url = `${environment.apiUrl}coal/types/${id}`;
    return this.http.delete(url);
  }
}
