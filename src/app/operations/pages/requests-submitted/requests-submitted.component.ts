import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { DropDownItem } from '@shared/model/dropDown.model';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicTableComponent } from '@shared/components/dynamic-table/dynamic-table.component';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { FilterComponent } from '@operations/components/filter/filter.component';
import { SearchComponent } from '@operations/components/search/search.component';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { RequestCoreService } from 'app/core/services/RequestCore.service';

@Component({
  selector: 'app-requests-submitted',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    SearchBarComponent,
    DynamicFormComponent,
    SubmitButtonComponent,
    ReactiveFormsModule,
    DynamicTableComponent,
    BtnDropdownComponent,
    FilterComponent,
    SearchComponent,
  ],
  templateUrl: './requests-submitted.component.html',
  styleUrl: './requests-submitted.component.scss',
})
export class RequestsSubmittedComponent {
  formGroup: FormGroup;
  serviceNameDropDownList: DropDownItem[];
  statusDropDownList: DropDownItem[];
  formModel;
  formType;
  requestTypes: Map<number, string> = new Map<number, string>();

  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  headers;
  tableData: any[];
  constructor(
    private requestSubmittedService: RequestSubmittedService,
    private router: Router,
    private auth: AuthService,
    private requestCoreService: RequestCoreService
  ) {
    this.serviceNameDropDownList =
      this.requestSubmittedService.serviceNameDropDownList;
    this.statusDropDownList = this.requestSubmittedService.statusDropDownList;
    this.formModel = this.requestSubmittedService.date;
    this.headers = this.requestSubmittedService.tableHeader;
    // this.tableData = this.requestSubmittedService.tableData;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() returns month from 0-11
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // pad minutes to ensure two digits

    // return `${day}/${month}/${year} at ${hours}:${minutes}`;
    return `${day}/${month}/${year}`;
  }

  ngOnInit() {
    this.requestSubmittedService.getCustomerRequests().subscribe((res) => {
      this.tableData = [];

      for (let i = 0; i < (res['data'] as []).length; i++) {
        this.tableData.push({
          companyName: res['data'][i].company_name,
          serviceName: res['data'][i].name,
          orderNumber: res['data'][i]['id'],
          orderDate: this.formatDate(res['data'][i]['created_at']),
          status: res['data'][i]['file_status'],
          copyOfApproval: 'tableHeader.viewFile',
          modelAutomated: 'tableHeader.viewFile',
          is_33form: res['data'][i].is_33form,
          isApprovalForm:  res['data'][i].isApprovalForm,
          details: 'التفاصيل',
          orderTracking: 'tableHeader.orderTracking',
        });
      }
      this.getTable();
    });
  }

  ngAfterViewInit() {
    this.dynamicTableWrapper.buttonClick.subscribe((event) => {
      let check =
        event.row['status'] == 'Created' ||
        event.row['status'] == 'CompleteEntry';
      this.requestCoreService.customerRequestId = event.row['orderNumber'];
      this.requestCoreService.setCurrentCustomerRequestId(
        event.row['orderNumber']
      );
      this.requestCoreService.setCustomerRequestStatus(event.row['status']);
      if (event['key'] == 'details') {
        switch (this.auth.userRole) {
          case 'department_supervisor':
            if (
              (this.auth.appUser.sub.administrativeId == 8 ||
                this.auth.appUser.sub.administrativeId == 11 ||
                this.auth.appUser.sub.administrativeId == 9) &&
              check
            ) {
              this.formType = 'check';
            } else if (
              this.auth.appUser.sub.administrativeId == 8 &&
              event.row['status'] == 'AcceptRDF'
            ) {
              this.formType = 'check';
            } else {
              //if (this.auth.appUser.sub.administrativeId == 12) {
              this.formType = 'view-only';
              // this.router.navigateByUrl('operations/feesAndExpenses/'+ event.row['orderNumber'])
            }
            break;
          case 'employee':
            if (
              (this.auth.appUser.sub.administrativeId == 8 ||
                this.auth.appUser.sub.administrativeId == 11 ||
                this.auth.appUser.sub.administrativeId == 9) &&
              check
            ) {
              this.formType = 'check';
            } else if (
              this.auth.appUser.sub.administrativeId == 8 &&
              event.row['status'] == 'AcceptRDF'
            ) {
              this.formType = 'check';
            } else {
              //if (this.auth.appUser.sub.administrativeId == 12) {
              this.formType = 'view-only';
              // this.router.navigateByUrl('operations/feesAndExpenses/'+ event.row['orderNumber'])
            }
            break;
          case 'customer':
            if (
              event.row['status'].indexOf('Accept') != -1 ||
              event.row['status'].indexOf('Confirm') != -1 ||
              event.row['status'].indexOf('Rejected') != -1 ||
              event.row['status'].indexOf('CustomerPAID') != -1
            ) {
              this.formType = 'view-only';
            } else this.formType = 'edit';
            break;
        }
        let redirectUrl = 'operations/requestForm';
        if (this.requestTypes.get(event.row['orderNumber']) === 'coal-plant') {
          this.requestCoreService.setRequestType('coal-plant');
          redirectUrl = 'operations/plant-coal';
        }
        this.router.navigateByUrl(
          `${redirectUrl}/${this.formType}/` + event.row['orderNumber']
        );
      }
    });
  }

  getTable() {
    const headers = this.headers.headers.map(
      (header, i) =>
        ({
          key: header.substring(12),
          translatedKey: header,
          index: i,
          isSelected: true,
        } as TableHeader)
    );
    if (this.tableData?.length > 0) {
      this.dynamicTableWrapper.render(headers, this.tableData);
    }
  }
  searchRequest() {}
  search(e) {
    alert(555);
  }
  filter(e) {
    alert(666);
  }
}
