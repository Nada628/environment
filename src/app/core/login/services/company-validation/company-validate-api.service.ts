
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CompanyValidationApiSerivce {
  baseUrl = environment.apiUrl
  constructor(private httpClient: HttpClient) { }

  validateCompany(form) {
    let apiUrl = `${this.baseUrl}company/activate`
    return this.httpClient.post(apiUrl, form)
  }
}
 