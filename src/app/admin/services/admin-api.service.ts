import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private httpClient: HttpClient) {}

  getData(page) {
    const url = `${environment.apiUrl}/basic-data/${page}`;
    return this.httpClient.get(url);
  }

  addNew(page, body) {
    const url = `${environment.apiUrl}/basic-data/${page}`;
    return this.httpClient.post(url, body);
  }
  editData(page, body, id) {
    const url = `${environment.apiUrl}/basic-data/${page}/${id}`;
    return this.httpClient.put(url, body);
  }

  deleteData(page, id) {
    const url = `${environment.apiUrl}/basic-data/${page}/${id}`;
    return this.httpClient.delete(url);
  }

  getAdministrationsList() {
    const url = `${environment.apiUrl}/basic-data/administration`;
    return this.httpClient.get(url);
  }
}
