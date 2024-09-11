import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class FeesAndExpensesApiService {
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getFees(request: number) {
    const url =
      `${this.baseUrl}/portal-data/request-fees/fees-by-request?requestId=` +
      request;
    return this.httpClient.get(url);
  }

  submitExpenses(body) {
    const url = `${this.baseUrl}portal-data/request-fees`;
    return this.httpClient.post(url, body);
  }

  getRequestById(requestId) {
    const url = `${environment.apiUrl}portal/customer-request/${requestId}`;
    return this.httpClient.get(url);
  }
  calculateCharge(requestId, currencyRate) {
    const url = `${environment.apiUrl}portal/customer-request/calculate-charge?requestId=${requestId}&&currencyRate=${currencyRate}`;
    return this.httpClient.get(url);
  }

  getPaidInvoice(requestId: number) {
    const url = `${environment.apiUrl}expense-payment/get/33form/${requestId}`;
    return this.httpClient.get(url);
  } //33 invoice
  getDataByRequestNum(requestId: number) {
    const url = `${environment.apiUrl}expense-payment/get/33form/byRequest/${requestId}`;
    return this.httpClient.get(url);
  } //33 invoice

  getAcceptTemplateForm(requestId: number) {
    const url = `${environment.apiUrl}portal/customer-request/request-model/${requestId}`;
    return this.httpClient.get(url);
  }

  // --------------------------------------------------------

  getFeesByRequest(requestId: number) {
    const url = `${environment.apiUrl}fees-expenses/${requestId}`;
    return this.httpClient.get(url);
  }

  getTotalExpenses(
    requestId: number,
    body: { currency_value: number; date: string; rdf_handred_percent: string }
  ) {
    const url = `${environment.apiUrl}fees-expenses/getTotalExpenses/${requestId}`;
    return this.httpClient.post(url, body);
  }

  saveFees(requestId: number, body) {
    const url = `${environment.apiUrl}request-expenses/${requestId}`;
    return this.httpClient.post(url, body);
  }

  getPercentage(id:any){
    const url = `${environment.apiUrl}fees-expenses/${id}`;
    return this.httpClient.get(url);
  }
}
