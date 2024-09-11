import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RegisterCompanyApiService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  registerCompany(form) {
    let apiUrl = `${this.baseUrl}company`;
    return this.httpClient.post<FormData>(apiUrl, form);
  }
}
