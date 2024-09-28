import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LogsApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.managerName',
        'tableHeader.employeeName',
        'tableHeader.desc',
        'tableHeader.date',
        'tableHeader.macAddress',
      ],
    };
  }

  // Fetch all Logs
  getLogs(): Observable<any> {
    const url = `${environment.apiUrl}logs`;
    return this.http.get(url);
  }
 
}
