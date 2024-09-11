import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/model/api-response.model';
import { AuthService } from 'app/core/services/auth.service';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RdfApisService {
  baseUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.baseUrl = environment.apiUrl;
  }

  createRdf(body, requestId) {
    let rdfObj = {
      ...body,
      // totalWeightInTon: 55,
      // date: '2023-24-12',
      // providerName: 'mahmoud-o',
      requestId: requestId,
      requesterId: this.auth.appUser.sub['id'],
      // invoices: [
      //   {
      //     id: 2,
      //     fileField: 'INVOICE',
      //   },
      // ],
      // weightInTon: 25,
      // companySituationUsed: true, // true above or equal 10%
      // includeEnergyReject: true, // true above 10%,
      // companyConfirm: true,
    };
    const url = this.baseUrl + '/portal-data/rdf';
    return this.http.post(url, rdfObj);
  }

  getRdfRequestById(id) {
    const url = `${environment.apiUrl}/portal-data/rdf/rdf-by-request?requestId=${id}`;
    return this.http.get<ApiResponse>(url);
  }
}
