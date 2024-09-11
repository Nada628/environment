import { Injectable } from '@angular/core';
import { CompanyApiService } from '@shared/services/company.api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RequestCoreService {
  customerRequest;
  currentUser;
  customerRequestId;
  customerRequestStatus;
  requestype;
  coalType;
  loggerList;

  constructor(
    private companyApiService: CompanyApiService,
    private auth: AuthService
  ) {}

  setCustomerRequestStatus(status: any) {
    this.customerRequestStatus = status;
    sessionStorage.setItem('status', this.customerRequestStatus);
  }

  getCustomerRequestStatus(): any {
    return this.customerRequestStatus
      ? this.customerRequestStatus
      : sessionStorage.getItem('status');
  }

  setCurrentCustomerRequestId(requestId: number) {
    this.customerRequestId = requestId;
    localStorage.setItem('requestId', this.customerRequestId);
    sessionStorage.setItem('requestId', this.customerRequestId);
  }

  getCurrentCustomerRequestId() {
    return sessionStorage.getItem('requestId')?.toString();
  }

  setRequestType(requestype) {
    sessionStorage.setItem('requestype', requestype);
  }

  getRequstType() {
    return sessionStorage.getItem('requestype')?.toString();
  }

  setCoalType(coalType) {
    sessionStorage.setItem('coalType', coalType);
  }

  setLoggerList(loggerList) {
    //obslesete
    this.loggerList = loggerList;
    sessionStorage.removeItem('loggerList');
    sessionStorage.setItem('loggerList', JSON.stringify(loggerList));
  }

  getLoggerList() {
    //obslesete
    return sessionStorage.getItem('loggerList');
  }

  getOwnerCompanies() {
    return this.companyApiService.getCompanyByOwnerId(this.auth.userId);
  }
}
