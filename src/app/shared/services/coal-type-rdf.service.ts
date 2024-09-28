import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CoalTypeRdfApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.name',
        'tableHeader.code',
        'tableHeader.ratioPrice',
        'tableHeader.departmentName',
        'tableHeader.Percentage',
        // 'tableHeader.settings',
      ],
    };
  }
  // Fetch departments for department name type
getDepartments(): Observable<any> {
    const url = `${environment.apiUrl}departments`;
    return this.http.get(url);
  }

  // Fetch all of coal-rdf
  getCoalRdf(): Observable<any> {
    const url = `${environment.apiUrl}less-rdf`;
    return this.http.get(url);
  }
  // Fetch coal-rdf data by ID
  getCoalRdfById(id: number): Observable<any> {
    const url = `${environment.apiUrl}less-rdf/${id}`;
    return this.http.get(url);
  }
  // Submit coal-rdf data to the API
  addCoalRdf(CoalRdfData: any): Observable<any> {
    const url = `${environment.apiUrl}less-rdf`;
    return this.http.post(url, CoalRdfData);
  }
  // Update coal-rdf data (for editing an existing coal-rdf)
  updateCoalRdf(CoalRdfData: any): Observable<any> {
    const url = `${environment.apiUrl}less-rdf/${CoalRdfData.id}`;
    return this.http.put(url, CoalRdfData);
  }
  // Delete coal-rdf by ID
  deleteCoalRdf(id: number): Observable<any> {
    const url = `${environment.apiUrl}less-rdf/${id}`;
    return this.http.delete(url);
  }
}
