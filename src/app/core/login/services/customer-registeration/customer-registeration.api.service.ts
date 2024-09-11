import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerRegisterationAPIService {
  Url = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) {}

  registerType() {
    return this.httpClient.get(`${this.Url}departments`);
  }

  registerCustomerAPI(registerRequest) {
    return this.httpClient.post(`${this.Url}register`, registerRequest);
  }
}
