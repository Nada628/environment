import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/model/api-response.model';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OperationsApiService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  updateRequestStatus(requestId, status) {
    let url = `${this.baseUrl}expense-payment/update/33form/${requestId}`;
    let body = { status: status };
    return this.httpClient.put<ApiResponse>(url, body);
  }
  // updateRequestStatus(requestId, status) {
  //   let url = `${this.baseUrl}assign/environmental/request/${requestId}`;
  //   let body = { status: status };
  //   return this.httpClient.put<ApiResponse>(url, body);
  // }

  submitInputField(requestId, inputsList) {
    let url = `${this.baseUrl}/portal/customer-request/check-field`;
    let body = {
      requestId: requestId,
      field: inputsList,
    };
    return this.httpClient.post<ApiResponse>(url, body);
  }

  clearInputField(requestId, inputsList) {
    let url = `${this.baseUrl}/portal/customer-request/clear-error`;
    let body = {
      clears: inputsList,
      requestId: requestId,
    };
    return this.httpClient.delete<ApiResponse>(url, { body });
  }

  getInputField(requestId) {
    let url = `${this.baseUrl}customer-requests/${requestId}`;
    return this.httpClient.get<ApiResponse>(url);
  }
}
