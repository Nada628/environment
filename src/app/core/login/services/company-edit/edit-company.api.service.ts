import { Injectable } from '@angular/core';
import { CompanyApiService } from '@shared/services/company.api.service';

@Injectable({
  providedIn: 'root',
})
export class EditCompanyApiService extends CompanyApiService {
  editCompany(form, id) {
    let apiUrl = `${this.baseUrl}/company/${id}/show`;
    return this.httpClient.post(apiUrl, form);
  }
}
