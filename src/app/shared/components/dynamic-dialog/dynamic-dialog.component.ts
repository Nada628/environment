import { AdminUtilitiesService } from '@admin/services/admin-utils.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogService } from '@shared/services/dialog.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from 'app/language/translation.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { UtilitiesApiService } from '@shared/services/utilities.api.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  providers: [DialogService, AdminUtilitiesService],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    DynamicFormComponent,
    TranslateModule,
  ],
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.scss',
})
export class DynamicDialogComponent {
  @ViewChild('dynamicForm') dynamicForm!: ElementRef;
  baseUrl = environment.apiUrl;
  options;
  formDataModel;
  tableData;
  formData;
  gridData;
  currentLang;
  companyForm;
  companyAttachments = [];
  count = new BehaviorSubject(0);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    dialogService: DialogService,
    ts: TranslationService,
    private dialogRef: MatDialogRef<DynamicDialogComponent>,
    private httpClient: HttpClient,
    private utilitiesApiService: UtilitiesApiService,
    private auth: AuthService
  ) {
    this.options = dialogService.dialogOptions.find(
      (option) => option.type === data.option
    );

    if (
      data.option == 'add' ||
      data.option == 'edit' ||
      data.option == 'addNewCompany'
    ) {
      this.formDataModel = data.selectedForm;
    }
 
    if (data.option == 'digitalSealingSuccess') {
      this.gridData = true;
    }
    this.currentLang = ts.currentLang;
  }

  getCompanyForm(form) {
    this.companyForm = form;
    this.uploadFile(form.Accept_Company, 'Accept_Company');
    this.uploadFile(form.accept_eea_papre, 'accept_eea_papre');
  }

  uploadFile(file, key) {
    // let formData = new FormData();
    // formData.append('files', file, file.name);
    // this.utilitiesApiService.uploadFile(formData).subscribe((res) => {
    //   if (key === 'accept_eea_papre') {
    //     this.companyAttachments.push({
    //       fileField: 'accept_eea_papre',
    //       id: res['content'][0]['id'],
    //       validFromDate: this.companyForm['validFromDate'],
    //       validToDate: this.companyForm['validToDate']
    //     });
    //     delete this.companyForm['accept_eea_papre'];
    //     delete this.companyForm['validFromDate'];
    //     delete this.companyForm['validToDate'];
    //     this.count.next(this.companyAttachments.length);
    //   } else if (key === 'Accept_Company') {
    //     this.companyAttachments.push({
    //       fileField: 'Accept_Company',
    //       id: res['content'][0]['id'],
    //     });
    //     delete this.companyForm['Accept_Company'];
    //     this.count.next(this.companyAttachments.length);
    //   }
    // }
    // );
  }

  addCompany(form, action) {
    let apiUrl = `${this.baseUrl}/portal-data/company`;
    this.getCompanyForm(form);
    this.count.subscribe((res) => {
      if (res === 2) {
        this.companyForm = {
          ...this.companyForm,
          attachments: this.companyAttachments,
        };
        let formToSend = {
          ...this.companyForm,
          userId: this.auth.appUser.sub.id, // login user who make action
          commercial_record_number: null,
          import_card_number: null,
          tax_record_number: null,
          industry_record_number: null,
          ownerId: null, // owner user
          phone_number: null,
          city_code: null,
          gov_id: null,
          email: null,
          manager_name: null,
          quota_valid_from: null,
          quota_valid_to: null,
          quota: null,
          purpose: null,
          address: null,
          // import_card_number: null,
          type_id: null,
        };
        return this.httpClient.post(apiUrl, formToSend).subscribe((res) => {
          this.dialogRef.close({ action: action, data: res['content'] });
          window.location.reload();
        });
      }
    });
  }

  getFormValues(values) {
    this.formData = values;
  }

  excuteAction(action) {
    switch (action) {
      case 'add':
        if (this.formData !== undefined) {
          this.dialogRef.close({ action: action, data: this.formData });
        }
        break;
      case 'addCompany':
        let form = this.dynamicForm['dynamicFormGroup'].value;
        this.addCompany(form, action);
        break;
      case 'edit':
        this.dialogRef.close({ action: action, data: this.formData });
        break;
      case 'delete':
        this.dialogRef.close({ action: action });
        break;
      case 'dismiss':
        this.dialogRef.close({ action: action });
        break;
      default:
        this.dialogRef.close({ action: action });
        break;
    }
  }
}
