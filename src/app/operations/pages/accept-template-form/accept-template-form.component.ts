import { CommonModule } from '@angular/common';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { AttachedDocumentsComponent } from '@operations/components/attached-documents/attached-documents.component';
import { DigitalSealingFormComponent } from '@operations/components/digital-sealing-form/digital-sealing-form.component';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { FeesAndExpensesApiService } from '@operations/services/fees-and-express.api.service';
import { OperationsApiService } from '@operations/services/operations.api.service';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { RequestCoreService } from 'app/core/services/RequestCore.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-accept-template-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
    AttachedDocumentsComponent,
    DigitalSealingFormComponent,
    SubmitButtonComponent,
    SubtitleComponent,
    RdfFormComponent,
    ReviewerFormComponent,
    TranslateModule,
  ],
  templateUrl: './accept-template-form.component.html',
  styleUrl: './accept-template-form.component.scss',
})
@Injectable()
export class AcceptTemplateFormComponent implements OnInit {
  @Input() form: FormGroup;
  requestId;
  templateForm;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fees: FeesAndExpensesApiService,
    private requestCoreService: RequestCoreService,
    private operationsApiService: OperationsApiService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {
    this.route.params.subscribe((params) => {
      this.requestId = params['requestId'];
      this.fees.getAcceptTemplateForm(this.requestId).subscribe((val) => {
        this.templateForm = val['content'];
        translateService.setDefaultLang('ar');
        this.initForm();
      });
    });
  }
  ngOnInit(): void {
    window.addEventListener('afterprint', (event) => {
      this.doAfterPrint();
    });
  }
  initForm() {
    this.form = this.formBuilder.group({
      area: [],
      name: [this.templateForm?.name],
      companyName: [this.templateForm?.companyDto.name],
      createdDate: [this.templateForm?.createdDate],
      coalType: [this.templateForm?.coalType],
      unloadWayName: [this.templateForm?.unloadWayName],
      arrivedDate: [this.templateForm?.arrivedDate],
      shipmentStages: [this.templateForm?.shipmentStages],
      arrivedHarbor: [this.templateForm?.landingHarbor.name],
      importHarbor: [this.templateForm?.importHarbor.name],
      produceCompany: ['produceCompany'],
      shipDate: [this.templateForm?.shipDate],
      weightInTon: [this.templateForm?.weightInTon],
      typeAndPurpose: [this.templateForm?.coalType],
    });
  }
  sendToEEAManager() {
    this.requestCoreService.getCustomerRequestStatus();
    this.operationsApiService
      .updateRequestStatus(this.requestId, 'AcceptForm')
      .subscribe((res) => {
        this.toastr.success('Status Submitted Successfully');
        this.router.navigateByUrl('operations/requestsSubmitted');
      });
  }
  print(elem) {
    window.print();

    return true;
  }
  doAfterPrint() {
    this.operationsApiService
      .updateRequestStatus(this.requestId, 'AcceptFormT')
      .subscribe((res) => {
        this.toastr.success('Status Submitted Successfully');
        this.router.navigateByUrl('operations/requestsSubmitted');
      });
  }
}
