import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/model/api-response.model';
import { MenutItem } from 'app/core/layout/models/menu-header.model';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CompanyApiService {
  baseUrl = environment.apiUrl;
  constructor(protected httpClient: HttpClient) {}

  getCompanyByOwnerId(id) {
    let apiUrl = `${this.baseUrl}user/company/${id}`;
    return this.httpClient.get<ApiResponse>(apiUrl);
  }
  

  getCompanyById(id) {
    let apiUrl = `${this.baseUrl}company/${id}/show`;
    return this.httpClient.get(apiUrl);
  }
}
