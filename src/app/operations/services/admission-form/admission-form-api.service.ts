import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/model/api-response.model';
import { AuthService } from 'app/core/services/auth.service';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmissionFormApiService {
  baseUrl = environment.apiUrl;
  selectedCompany = new BehaviorSubject(null);

  role;

  constructor(private auth: AuthService, private http: HttpClient) {
    this.role = this.auth.userRole;
  }

  onSubmitAdmissionFormData(form) {
    for (const key in form) {
      if (
        key === 'HARBOR_LANDING_RIVER' ||
        key === 'STORE_ACCEPT_PAPER' ||
        key === 'STORE_INTERMEDIATE_PAPER' ||
        key === 'TRANSPORT_ACCEPT_PAPER' ||
        key === 'UNLOAD_ACCEPT_PAPER' ||
        key === 'shipmentWeight'
      ) {
        delete form[key];
      }
    }

    this.selectedCompany.next(form.companyId);
    let initform = {
      ...form,
      requesterId: this.auth.appUser['sub'].id,
      name: form.requestType ? form.requestType.name : 'request',
      code: '',
      requestTypeId: 1,
      notes: 'notes from lead',
      commentsList: null,
    };

    const url = this.baseUrl + 'customer-requests';
    return this.http.post<ApiResponse>(url, initform);
  }

  onEditAddmissionFormData(form, requestId) {
    for (const key in form) {
      if (
        key === 'HARBOR_LANDING_RIVER' ||
        key === 'STORE_ACCEPT_PAPER' ||
        key === 'STORE_INTERMEDIATE_PAPER' ||
        key === 'TRANSPORT_ACCEPT_PAPER' ||
        key === 'UNLOAD_ACCEPT_PAPER' ||
        key === 'shipmentWeight'
      ) {
        delete form[key];
      }
    }
    this.selectedCompany.next(form.companyId);
    let initform = {
      ...form,
      requesterId: this.auth.appUser['sub'].id,
      name: form.requestType.name,
      code: '',
      requestTypeId: 1,
      notes: 'notes from lead',
      commentsList: null,
    };
    const url = `${this.baseUrl}/portal/customer-request/${requestId}`;
    return this.http.put<ApiResponse>(url, initform);
  }

  getRequestLog(requestId: number) {
    const url = `${this.baseUrl}/portal-data/logger/request-log/${requestId}`;
    return this.http.get<ApiResponse>(url);
  }

  assignRequest(requestId: number, body: any ,RdfValue:boolean) {
    let url;
    if (this.role === 'rdf' && RdfValue ) {
      url = `${this.baseUrl}assign/rdf/request/${requestId}`;
    } else if (this.role === 'environmental.found') {
      url = `${this.baseUrl}assign/environmental/request/${requestId}`;
    } else if (this.role === 'investors') {
      url = `${this.baseUrl}assign/investor/request/${requestId}`;
    } else if (this.role === 'manager') {
      url = `${this.baseUrl}assign/manager/request/${requestId}`;
    } else {
      url = `${this.baseUrl}assign/request/${requestId}`;
    }
    return this.http.put<ApiResponse>(url, body);
  }

  requestAddCompany(endPoint, body) {
    const url = this.baseUrl + endPoint;
    return this.http.post<ApiResponse>(url, body);
  }

  getComments(requestId: number) {
    return this.http.get<ApiResponse>(`${this.baseUrl}comment/${requestId}`);
  }

  addComment(requestId: number, comment: string) {
    return this.http.post<ApiResponse>(
      `${this.baseUrl}comment/create/${requestId}`,
      { comment: comment }
    );
  }
}
