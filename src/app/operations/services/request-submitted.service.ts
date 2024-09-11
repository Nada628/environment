import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { DropDownItem } from '@shared/model/dropDown.model';
import { AuthService } from 'app/core/services/auth.service';
import { environment } from 'environments/environment.prod';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestSubmittedService implements OnInit {
  serviceNameDropDownList: DropDownItem[];
  statusDropDownList: DropDownItem[];
  date;
  tableHeader;
  tableData;
  activate = new BehaviorSubject(false)
  ifCompany = new BehaviorSubject(false)

  constructor(private http: HttpClient, private auth: AuthService) {
    this.serviceNameDropDownList = [];
    this.init();
    this.statusDropDownList = [];

    var today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.date = {
      startsAt: {
        type: 'date',
        value: this.getDateValue(today),
        col: 'col-6 pb-0',
        label: 'common.from',
      },
      endsAt: {
        type: 'date',
        value: this.getDateValue(tomorrow),
        col: 'col-6 pb-0',
        label: 'common.to',
      },
    };

    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.companyName',
        'tableHeader.serviceName',
        'tableHeader.orderNumber',
        'tableHeader.orderDate',
        'tableHeader.status',
        'tableHeader.copyOfApproval',
        'tableHeader.modelAutomated',
        'tableHeader.details',
        'tableHeader.orderTracking',
      ],
    };
  }
  init() {
    // this.getRequestTypes().subscribe((result) => {
    //   let types = result['data'];
    //   types.forEach((res) => {
    //     this.serviceNameDropDownList.push({ name: res['name'] });
    //   });
    // });


      // this.serviceNameDropDownList = [];
    // this.getRequestStatuses().subscribe(result=>{
    //   let status = result['content'];
    //     status.forEach(element => {
    //       this.statusDropDownList.push({name:element});
    //     });
    // })
  }
  ngOnInit(): void {
    //alert(88);
  }

  getDateValue(date) {
    var dd = ('0' + date.getDate()).slice(-2);
    var mm = ('0' + (date.getMonth() + 1)).slice(-2);
    var yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

checkRdfWithoutId(){
  let url = environment.apiUrl + 'activity/check/rdf';
  return this.http.get(url);
}

  getCustomerRequests() {
    let url;
    if (
      this.auth.userRole == 'department_supervisor' ||
      this.auth.userRole == 'rdf' ||
      this.auth.userRole == 'environmental.found' ||
      this.auth.userRole == 'investors' ||
      this.auth.userRole == 'manager'
    ) {
      url = environment.apiUrl + 'customer-requests';
    } else if (this.auth.userRole == 'customer') {
      url = environment.apiUrl + 'employee/requests/all';
    } else if (this.auth.userRole == 'employee') {
      url = environment.apiUrl + 'requests/assigned/request/employee';
    }
    return this.http.get(url);
  }

  getCustomerRequestById(id) {
    const url = `${environment.apiUrl}customer-requests/${id}`;
    return this.http.get(url);
  }
  getRequestTypes() {
    const url = `${environment.apiUrl}requests/types`;
    return this.http.get(url);
  }
  getRequestStatuses() {
    const url = `${environment.apiUrl}portal-data/request-operation/status-request-list`;
    return this.http.get(url);
  }
  checkActive(id:any){
    const url = `${environment.apiUrl}customer/request/checks/` + id;
    return this.http.get(url);
  }
}
