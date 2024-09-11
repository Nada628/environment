import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AddButtonComponent } from '@shared/components/buttons/add-button/add-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { CementCompanyRdfService } from '@operations/services/cement-company-rdf.service';
import { WastePercentageComponent } from '../waste-percentage/waste-percentage.component';
import { DigitalSealingFormComponent } from '../digital-sealing-form/digital-sealing-form.component';
import { OperationsApiService } from '@operations/services/operations.api.service';
import { AdmissionFormService } from '@operations/services/admission-form/admission-form.service';
import { FeesAndExpensesService } from '@operations/services/fees-and-expenses.service';
import { RequestCoreService } from 'app/core/services/RequestCore.service';

@Component({
  selector: 'app-rdf-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    AddButtonComponent,
    DynamicFormComponent,
    WastePercentageComponent,
    DigitalSealingFormComponent,
  ],
  templateUrl: './rdf-form.component.html',
  styleUrl: './rdf-form.component.scss',
})
export class RdfFormComponent {
  @ViewChild('invoiceDetails') invoiceDetails!: ElementRef;
  @ViewChild('totalRdfForm') totalRdfForm!: DynamicFormComponent;
  @ViewChild('wastePercentage') wastePercentage!: DynamicFormComponent;
  @ViewChild('digitalSealForm') digitalSealForm!: DigitalSealingFormComponent;
  @Input() hasCard: boolean = true;
  @Input() isReviewing: boolean;
  @Input() requestId: number;
  @Input() isCheckerForm: boolean;
  @Input() isEditForm: boolean;
  @Input() formType: string;
  @Input() requestStatus: string;
  formModel;
  totalRdf;
  wastePercentageFormModel;
  digitalSealingModel;

  constructor(
    private cementCompanyRdfService: CementCompanyRdfService,
    private operationsApiService: OperationsApiService,
    private toastr: ToastrService,
    private router: Router,
    private admissionFormService: AdmissionFormService,
    private feeService: FeesAndExpensesService,
    private requestCoreService: RequestCoreService
  ) {
    //     var date = new Date(1942615200 * 1000);
    // console. log(date. toUTCString());
    this.wastePercentageFormModel =
      this.cementCompanyRdfService.wastePercentage;
    this.digitalSealingModel = this.cementCompanyRdfService.digitalSealingModel;
    this.formModel = this.cementCompanyRdfService.invoiceData;
    this.totalRdf = this.cementCompanyRdfService.totalRdf;
  }

  onAddingInvoice() {
    this.formModel = this.cementCompanyRdfService.invoiceData;
    // Create a new reference for formModel to detect its changes on child component
    this.formModel = { ...this.formModel };
  }

  ObjWithUploadedFiles = null;
  convertingFormsToRequestObj() {
    let invoiceDetails = this.invoiceDetails['dynamicFormGroup'].value;
    let totalRdf = this.totalRdfForm['dynamicFormGroup'].value;
    let wastePercentage = this.wastePercentage['dynamicFormGroup'].value;
    let digitalSealForm = this.digitalSealForm['formGroup'].value;

    this.requestId = Number.parseInt(
      this.requestCoreService.getCurrentCustomerRequestId()
    );

    let formData = new FormData();
    if (invoiceDetails.invoices.invoices) {
      formData.append(
        'files',
        invoiceDetails.invoices.invoices,
        invoiceDetails.invoices.invoices.name
      );
    }

    // return this.utilitiesApiService.uploadFile(formData).subscribe((res) => {
    //   invoiceDetails.invoices.invoices = [{ id: res.content[0]['id'], fileField: 'INVOICE' }]
    //   let reqObj = {
    //     totalWeightInTon: totalRdf.totalWeightInTon,
    //     ...invoiceDetails.invoices,
    //     companySituationUsed:wastePercentage.wastePercentage !== 'greaterThanOrEqual', // true above or equal 10%
    //     includeEnergyReject:wastePercentage.wastePercentage === 'greaterThanOrEqual', // true above 10%,
    //     companyConfirm: digitalSealForm.companyConfirm,
    //   };
    //   this.rdfApisService
    //     .createRdf(reqObj , this.requestId)
    // });

    // return reqObj;
  }
  onSubmit() {
    let invoiceDetails = this.invoiceDetails['dynamicFormGroup'].value;
    let totalRdf = this.totalRdfForm['dynamicFormGroup'].value;
    let wastePercentage = this.wastePercentage['dynamicFormGroup'].value;
    if (
      this.isReviewing &&
      (this.requestStatus == 'Created' || this.requestStatus == 'CompleteEntry')
    ) {
      let checkerInputs = this.admissionFormService.checkerForm({
        invoiceDetails,
        totalRdf,
        wastePercentage,
      });

      let inputsList = [];
      let clearList = [];
      let requestStatus = 'AcceptRDF';
      checkerInputs.map((input) => {
        if (input.value != true) {
          inputsList.push(input.key.replace('Checker', ''));
          requestStatus = 'CompleteEntry';
        } else {
          clearList.push(input.key.replace('Checker', ''));
        }
      });
      if (clearList.length > 0)
        this.operationsApiService.clearInputField(this.requestId, clearList);

      this.UpdateStatusRequest(requestStatus, inputsList);

      return;
    } else if (this.formType == 'edit' || this.formType == 'add') {
      this.convertingFormsToRequestObj();
    } else if (this.requestStatus == 'AcceptRDF') {
      //   this.admissionFormService.checkFormDimmed( {invoiceDetails , totalRdf , wastePercentage});
      this.UpdateStatusRequest('Accept', []);
    } else if (this.formType == 'view-only') {
      this.feeService.setCustomerRequest(
        this.admissionFormService.customerRequest
      );
      this.router.navigateByUrl('operations/feesAndExpenses/' + this.requestId);
    }
  }
  UpdateStatusRequest(status, inputsList) {
    this.operationsApiService
      .updateRequestStatus(this.requestId, status)
      .subscribe((response) => {
        this.toastr.success('Status Submitted Successfully');
        this.router.navigateByUrl('operations/requestsSubmitted');
      });
    if (inputsList.length > 0) {
      this.operationsApiService
        .submitInputField(this.requestId, inputsList)
        .subscribe((response) => {
          this.toastr.success('Status Submitted Successfully');
          this.router.navigateByUrl('operations/requestsSubmitted');
        });
    }
  }
}
