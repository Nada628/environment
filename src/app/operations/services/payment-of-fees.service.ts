import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentOfFeesService {
  apiUrl = environment.apiUrl;
  role;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.role = this.auth.userRole;
  }

  getApprovalData(id:any){
    return this.http.get(this.apiUrl+'expense-payment/import/request/form/byRequest/'+id);
  }

  getPaymentDetails(requestId?: number) {
    const url = `${this.apiUrl}request-expenses/client`;
    let params = new HttpParams();
    if (requestId !== undefined) {
      params = params.set('customer_request_id', requestId.toString());
    }
    return this.http.get<[]>(url, { params });
  }

  getPaymentDetailsByRequestId(requestId?: number) {
    let url;
    if(this.role == 'customer'){
      url = `${this.apiUrl}expense-payment/${requestId}`;
    }
    else {
      url = `${this.apiUrl}expense-payment/import/${requestId}`
    }
    return this.http.get(url);
  }

 

  expensePayment(requestId, body: { attach; rdf_attach }) {
    const url = `${this.apiUrl}expense-payment/${requestId}`;
    let form = new FormData();
    form.append('attach', body.attach);
    form.append('rdf_attach', body.rdf_attach);
    return this.http.post(url, form);
  }
  
  expensePaymentForImport(requestId, body) {
    const url = `${this.apiUrl}expense-payment/create/import/${requestId}`;
    let form = new FormData();
    form.append('recet_num', body.recet_num);
    form.append('recet_date', body.recet_date);
    // form.append('recet_file', body.recet_file);
    return this.http.post(url, form);
  }

  getPayments(){
    return this.http.get(this.apiUrl+'expense-payment/import/request/form');
  }
  getInvistorsPayment(){
    return this.http.get(this.apiUrl+'customer-requests');
  }
  getPaymentDetailsForSupervisor(id:any){
    return this.http.get(this.apiUrl+'expense-payment/import/request/form/data/'+ id);
  }
  assignInvestor(id:any,data:any){
    return this.http.put(this.apiUrl+'assign/investor/request/'+ id,data);
  }

  approveForm(id:any,data:any){
    return this.http.put(this.apiUrl+'expense-payment/update/import/request/form/data/'+ id,data);
  }

  investorForm(requestId:any,data:any){
    const url = `${this.apiUrl}investor/attach/${requestId}`;
    return this.http.post(url, data);
  }

  getInvestorForm(id:any){
    return this.http.get(this.apiUrl+'investor/attach/'+ id);
  }

  Delete(id:any){
    return this.http.delete(this.apiUrl+'investor/attach/'+ id);
  }
  
}
