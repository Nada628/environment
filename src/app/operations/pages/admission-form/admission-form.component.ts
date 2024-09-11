import { AdmissionFormService } from '@operations/services/admission-form/admission-form.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AttachedDocumentsComponent } from '@operations/components/attached-documents/attached-documents.component';
import { DigitalSealingFormComponent } from '@operations/components/digital-sealing-form/digital-sealing-form.component';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import {
  CaseModel,
  DigitalSealModel,
  DocumentModel,
} from '@operations/models/customerForm.model';
import { AdmissionFormModelsService } from '@operations/services/admission-form/admission-form-models.service';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { Subscription } from 'rxjs';
import { AdmissionFormApiService } from '@operations/services/admission-form/admission-form-api.service';
import { AdmissionFormMappingService } from '@operations/services/admission-form/admission-form-mapping.service';
import { AuthService } from 'app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { CompanyApiService } from '@shared/services/company.api.service';
import { OperationsApiService } from '@operations/services/operations.api.service';
import { AdmissionFormUtilitiesService } from '@operations/services/admission-form/admission-form-utilities.service';
import { RdfApisService } from '@operations/services/rdf-apis.service';
import { CementCompanyRdfService } from '@operations/services/cement-company-rdf.service';
import { OperationsService } from '@operations/services/operations.service';
import { FeesAndExpensesService } from '@operations/services/fees-and-expenses.service';

@Component({
  selector: 'app-admission-form',
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
  ],
  templateUrl: './admission-form.component.html',
  styleUrl: './admission-form.component.scss',
})
export class AdmissionFormComponent {
  @ViewChild('cardForm') cardForm!: DynamicFormComponent;
  @ViewChild('documentForm') documentForm!: AttachedDocumentsComponent;
  @ViewChild('caseForm') caseForm!: AttachedDocumentsComponent;
  @ViewChild('rdfForm') rdfForm!: ElementRef;
  @ViewChild('digitalSealingForm') digitalSealingForm!: ElementRef;
  @Input() withCheckBox: boolean = true;
  case: boolean = true;
  mainModel: any;
  documentModel: DocumentModel;
  caseModel: CaseModel;
  digitalSealingModel: DigitalSealModel;
  mainModelArrays: {};
  attachmentsData;
  companies;
  formType;
  requestId;
  ownerCompaniesArr;
  submittedObj = null;
  attachmentsArr;
  requestDetail;
  invoice;
  countSubscription: Subscription;
  submitSubscription: Subscription;
  attachmentSubscription: Subscription;
  requestDetailSubscription: Subscription;
  invoiceSubscription: Subscription;
  customerRequestData;
  rdfRequestId;
  pendingRdf;
  isRdfRequestReady;
  inputsList;
  inputsListIds;
  statusArr;
  statusNote;
  mainNote;
  reviewersList;
  isCementCompany;
  loggerList;
  reviewer: string = 'مصطفى محمد';
  currentCompany;

  isReviewer: boolean = false;
  userRole = localStorage.getItem('roles');
  userPermissions : string[] = JSON.parse(localStorage.getItem('permissions'));
  count = 0;
  constructor(
    private admissionFormModelsService: AdmissionFormModelsService,
    private admissionFormService: AdmissionFormService,
    private admissionFormApiService: AdmissionFormApiService,
    private admissionFormMappingService: AdmissionFormMappingService,
    protected auth: AuthService,
    private route: ActivatedRoute,
    private requestSubmittedService: RequestSubmittedService,
    private companyApiService: CompanyApiService,
    private operationsApiService: OperationsApiService,
    private router: Router,
    private admissionFormUtilitiesService: AdmissionFormUtilitiesService,
    private rdfApiService: RdfApisService,
    private cementRdfService: CementCompanyRdfService,
    private operationsService: OperationsService,
    private feeService: FeesAndExpensesService
  ) {
    this.statusArr = this.admissionFormModelsService.statusArr;
    this.statusNote = this.admissionFormModelsService.statusNote;
    this.reviewersList = this.admissionFormModelsService.reviewersList;
    this.mainNote = this.admissionFormModelsService.mainNote;

    this.documentModel = this.admissionFormModelsService.getDocumentModel();
    this.caseModel = this.admissionFormModelsService.getCaseModel();
    this.digitalSealingModel =
      this.admissionFormModelsService.digitalSealingModel;
    this.attachmentSubscription =
      this.admissionFormMappingService.attachmentArrForApi.subscribe((res) => {
        this.attachmentsArr = res;
      });
    this.requestDetailSubscription =
      this.admissionFormMappingService.requestDetailForApi.subscribe(
        (requestDetail) => {
          this.requestDetail = requestDetail;
        }
      );

    this.invoiceSubscription =
      this.admissionFormMappingService.invoiceForApi.subscribe((invoice) => {
        this.invoice = invoice;
      });

    this.pendingRdf = true;

    this.userPermissions.map((permission) => {
      if (permission === 'coal_emp_assign') {
        this.isReviewer = false;
      }
      else{
        this.isReviewer = true;
      }
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.formType = params['type'];
      this.requestId = params['id'];
      this.mainModelArrays = {};
      this.mainModel = null;

      if (this.formType == 'view-only' && this.requestId) {
        console.log('view-only', this.requestId);
        this.getInputFieldsToBeEditted(this.requestId);
      } else {
        console.log('else', this.requestId);
        this.getAllCompanies();
      }

      // Will remove
      this.mainModel = this.admissionFormModelsService.getMainModel(
        this.mainModelArrays,
        undefined,
        undefined,
        this.auth.userRole
      );
      this.getCurrencyArr();

      // if user  is rdf department supervisor
      if (
        this.auth.appUser.sub['administrativeId'] == 4 &&
        this.auth.userRole === 'department_supervisor'
      ) {
      }
    });

    if (true) {
      this.getUnloadCompany();
    }
  }

  // currency
  getCurrencyArr() {
    this.admissionFormUtilitiesService.getCurrency().subscribe((res) => {
      this.mainModelArrays['currencyArr'] = res['data'];
      this.getOwnerCompaniesArr();
    });
  }

  // companies
  getOwnerCompaniesArr() {
    this.companyApiService
      .getCompanyByOwnerId(this.auth.userId)
      .subscribe((res) => {
        this.mainModelArrays['ownerCompaniesArr'] = res['companies'];
        this.getUnloadType();
      });
  }

  // unload type
  getUnloadType() {
    this.admissionFormUtilitiesService.getUnloadType().subscribe((res) => {
      this.mainModelArrays['unloadMethod'] = res['data'];
      console.log('unloadMethod', this.mainModelArrays['unloadMethod']);
      
      this.getCountryArr();
    });
  }

  // country
  getCountryArr() {
    this.admissionFormUtilitiesService.getCountry().subscribe((res) => {
      this.mainModelArrays['countryArr'] = res['countries'];
      this.getHarborArr();
    });
  }

  // harbor
  getHarborArr() {
    this.admissionFormUtilitiesService.getHarborList().subscribe((res) => {
      this.mainModelArrays['harborArr'] = res['data'];
      this.getCoalType();
    });
  }

  // coal
  getCoalType() {
    this.admissionFormUtilitiesService.getCoalType().subscribe((res) => {
      this.mainModelArrays['coalType'] = res['data'];
      this.getUnloadCompany();
    });
    this.getUnloadCompany();
  }

  // unload
  getUnloadCompany() {
    this.admissionFormUtilitiesService.getUnloadMethod().subscribe((res) => {
      this.mainModelArrays['unloadCompany'] = res['data'];
      console.log('unloadCompany', this.mainModelArrays['unloadCompany']);
      this.getStoreCompany();
    });
  }

  // store
  getStoreCompany() {
    this.admissionFormUtilitiesService.getStoreCompany().subscribe((res) => {
      this.mainModelArrays['storeCompany'] = res['data'];
      console.log('storeCompany', this.mainModelArrays['storeCompany']);
      this.getCentralStoreCompany();
    });
  }

  // central store
  getCentralStoreCompany() {
    this.admissionFormUtilitiesService
      .getCentralStoreCompany()
      .subscribe((res) => {
        this.mainModelArrays['centralStoreCompany'] = res['data'];
        console.log(
          'centralStoreCompany',
          this.mainModelArrays['centralStoreCompany']
        );
        this.getTransportCompany();
      });
  }

  // transport
  getTransportCompany() {
    this.admissionFormUtilitiesService
      .getTransportCompany()
      .subscribe((res) => {
        this.mainModelArrays['transportCompany'] = res['data'];
        console.log(
          'transportCompany',
          this.mainModelArrays['transportCompany']
        );

        this.getRiverCompany();
      });
  }

  // river
  getRiverCompany() {
    this.admissionFormUtilitiesService.getRiverCompany().subscribe((res) => {
      this.mainModelArrays['riverCompany'] = res['data'];
      console.log('riverCompany', this.mainModelArrays['riverCompany']);
      this.getImportCoalCompany();
    });
  }

  // importCoal
  getImportCoalCompany() {
    this.admissionFormUtilitiesService
      .getImportCoalCompany()
      .subscribe((res) => {
        this.mainModelArrays['importCoalCompany'] = res['data'];
        console.log(
          'importCoalCompany',
          this.mainModelArrays['importCoalCompany']
        );

        this.getAllCompanies();
      });
  }

  getAllCompanies() {
    this.admissionFormUtilitiesService.getAllCompanies().subscribe((res) => {
      this.companies = res['companies'];
      console.log('companies', this.companies);

      if (this.formType == 'check' || this.formType == 'view-only') {
        this.getRequestById(this.requestId);
      } else if (this.formType == 'edit') {
        this.getInputFieldsToBeEditted(this.requestId);
      } else {
        this.mainModel = this.admissionFormModelsService.getMainModel(
          this.mainModelArrays,
          undefined,
          undefined,
          this.auth.userRole
        );
      }
    });
  }

  getRequestById(id, inputFieldsList?) {
    console.log('getRequestById', id);

    this.requestSubmittedService
      .getCustomerRequestById(id)
      .subscribe((request) => {
        console.log('request', request);
        this.customerRequestData = request;
        console.log('customerRequestData', this.customerRequestData.company_id);

        this.mainModel = this.admissionFormModelsService.getMainModel(
          this.mainModelArrays,
          request,
          undefined,
          this.auth.userRole
        );

        // let requestCompnay = this.companies.filter((c) => {
        //   return c.id == this.customerRequestData.companyId;
        // })[0];

        // this.admissionFormApiService.selectedCompany.next(
        //   this.customerRequestData.companyId
        // );

        // this.isCementCompany =
        //   requestCompnay?.activity.code == 'RDF-Cement' ? true : false;

        // this.digitalSealingModel =
        //   this.admissionFormModelsService.digitalSealingModel;

        // let documentreq = {};
        // for (let attachment of request['data'].attachments) {
        //   let key = attachment['fileField'];
        //   documentreq[key] = attachment;
        // }
        // this.documentModel =
        //   this.admissionFormModelsService.getDocumentModel(documentreq);
        // this.caseModel =
        //   this.admissionFormModelsService.getCaseModel(documentreq);
        // if (request['data'].category == 1 || this.isCementCompany) {
        //   this.pendingRdf = true;

        //   this.getRdfRequestById(this.requestId);
        // }
        // if (request['data'].status == 'AcceptProtectEEA') {
        //   this.formType = 'view-only';
        // }
      });
  }

  getInputFieldsToBeEditted(id) {
    console.log('getInputFieldsToBeEditted', id);
    this.operationsApiService.getInputField(id).subscribe((response) => {
      console.log('responsesssssssssss', response);

      this.inputsList = response;
      this.inputsListIds = response['id'];
      this.getRequestById(id, this.inputsList);
    });
  }

  getRdfRequestById(id) {
    this.isRdfRequestReady = false;
    this.rdfApiService.getRdfRequestById(id).subscribe((request) => {
      this.cementRdfService.initForm(
        this.customerRequestData,
        this.formType,
        request.content
      );
      this.isRdfRequestReady = true;
      this.invoice = this.cementRdfService.invoiceData;
    });
  }

  onSubmit() {
    this.submitForm(false);

    let cardForm = this.cardForm['dynamicFormGroup'];
    this.admissionFormUtilitiesService.sentReq(cardForm).subscribe((res) => {});
    if (this.auth.userRole.includes('customer') && this.formType == 'add') {
    } else if (
      this.auth.userRole.includes('customer') &&
      this.formType == 'edit'
    ) {
      this.submitForm(true);
    } else {
      this.reviewForm();
    }
    this.setCurrentSelectdCompany(
      this.cardForm['dynamicFormGroup'].value.companyId
    );
  }

  setCurrentSelectdCompany(id: number) {
    this.currentCompany = this.companies.filter((rs) => {
      return rs.id == id;
    });
  }
  reviewForm() {
    let requestStatus = this.operationsService.getStatus(
      this.auth.appUser.sub.administrativeId
    );
    let cardForm = this.cardForm['dynamicFormGroup'].value;
    let rdfForm; //= this.getRdfRequestById(this.requestId);
    let invoiceDetails;
    let totalRdfForm;
    let wastePercentage;

    if (this.pendingRdf) {
      // rdfForm = this.rdfForm;
      // invoiceDetails = this.rdfForm['invoiceDetails']['dynamicFormGroup'].value;
      // totalRdfForm = this.rdfForm['totalRdfForm']['dynamicFormGroup'].value;
      // wastePercentage = this.rdfForm['wastePercentage']['dynamicFormGroup'].value;
    }
    if (
      this.formType == 'check' ||
      this.formType == 'view-only'
      // && this.auth.appUser.sub.administrativeId == 11
    ) {
      this.initStatusforReviewForm(
        requestStatus,
        { invoiceDetails, totalRdfForm, wastePercentage },
        this.pendingRdf,
        this.formType
      );
    } else if (!this.pendingRdf) {
      this.initStatusforReviewForm(
        requestStatus,
        { cardForm },
        false,
        this.formType
      );
    } else {
      this.initStatusforReviewForm(
        requestStatus,
        { invoiceDetails, totalRdfForm, wastePercentage },
        this.pendingRdf,
        this.formType
      );
    }
  }

  initStatusforReviewForm(requestStatus, forms, isRdf, formType) {
    let inputsList = [];
    let clearList = [];
    let checkerInputs = [];

    if (!isRdf) {
      checkerInputs = this.admissionFormService.checkerForm(forms);
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
      this.feeService.setCustomerRequest(this.customerRequestData);
      this.router.navigateByUrl('operations/feesAndExpenses/' + this.requestId);
    }

    if (formType == 'check') {
      this.submitReviewForm(requestStatus, inputsList, isRdf);
    }
    //  else{

    //}
  }

  submitReviewForm(status, inputsList, isRdf) {
    if (isRdf) {
      this.admissionFormService.nextPage.next({
        nextPage: true,
        requestId: this.requestId,
      });
      return;
    }

    /* this.operationsApiService
      .updateRequestStatus(this.requestId, status)
      .subscribe((response) => {});
      if(inputsList.length > 0){
      this.operationsApiService.submitInputField(this.requestId, inputsList).subscribe((response) => {
        this.toastr.success('Status Submitted Successfully');
        this.router.navigateByUrl('operations/requestsSubmitted');
            });
          }
       */
  }

  addcomment(event) {
    alert(this.requestId);
  }

  submitForm(isEditForm) {
    let cardForm = this.cardForm['dynamicFormGroup'];
    let caseForm = this.caseForm['formGroup'];
    let digitalSealingForm = this.digitalSealingForm['formGroup'];
    let documentForm = this.documentForm['formGroup'];

    const att = [];
    for (const x in this.mainModel) {
      if (this.mainModel[x].type === 'file') {
        att.push(this.mainModel[x]);
      }
    }
    // const body = {
    //   "description": "",
    //   "name": "test",
    //   "company_id": 1,
    //   "import_harbor_id": 1,
    //   "ship_date": "",
    //   "landing_harbor_id": 1,
    //   "ship_name": "Test",
    //   "arrived_date": "2024-01-10T00:00:00.000000Z",
    //   "total_price_char": "100",
    //   "price_per_ton": 100,
    //   "price_per_ton_char": null,
    //   "char_currency_id": 1,
    //   att: [],
    //   "coal_id": null,
    //   "coal_currency_id": 1,
    //   "coal_price": 100,
    //   "coal_price_char": null,
    //   "import_coal_company_id": null,
    //   "unload_way_id": 1,
    //   "shipment_stages": "Test",

    //   "unload_company_id": "",
    //   unload_company_aproval_number: "",
    //   unload_company_aproval_date: "",

    //   store_company_id: "",
    //   store_company_aproval_number: "",
    //   store_company_aproval_date: "",

    //   transport_company_id: "",
    //   transport_company_aproval_date: "",
    //   transport_company_aproval_number: "",

    //   centeral_store_company_id: "",
    //   centeral_store_company_aproval_date: "",
    //   centeral_store_company_aproval_number: "",

    //   "confirm_payment": null,
    //   "confirm_agent_exist": null,
    //   "confirm_hook_used": null,

    //   // Step Two
    //   rdf_ton: '',
    //   rdf_date: "",
    //   rdf_importer: "",

    //   rdf_total: "",

    //   // value => less than 10 or ge than 10
    //   rdf_rate: '',
    //   confirm_rdf: '',

    // }
    const body = {
      ...caseForm.value,
      ...cardForm.value,
      ...digitalSealingForm.value,
      ...documentForm.value,
    };

    // this.httpService.post(Requests.customer_requests, body, false).subscribe()

    // let documentForm = this.documentForm['formGroup'];
    // let digitalSealingForm = this.digitalSealingForm['formGroup'].value;

    // this.addm.sentReq(cardForm).subscribe((res) => {

    // });

    // this.admissionFormApiService.selectedCompany.next(
    //   cardForm?.value.companyId
    // );
    // this.admissionFormMappingService.getAttachmentRes({
    //   cardForm,
    //   documentForm,
    //   caseForm,
    //   digitalSealingForm,
    // });

    // this.countSubscription = this.admissionFormMappingService.count.subscribe(
    //   (count) => {
    //     if (count < 16) {
    //       for (const key in this.requestDetail) {
    //         let company = this.companies.filter(
    //           (company) => company.id == this.requestDetail[key].companyId
    //         );
    //         if (company && company[0]) {
    //           this.requestDetail[key].companyActivityId = company[0].activityId;
    //         }
    //       }
    //       this.requestDetail =
    //         this.admissionFormMappingService.requestDetailsMapping(
    //           this.requestDetail
    //         );
    //       let formReq = {
    //         ...this.cardForm['dynamicFormGroup'].value,
    //         ...this.cardForm['dynamicFormGroup'].value.shipmentWeight,
    //         invoice: this.invoice,
    //         requestDetail: this.requestDetail,
    //         attachments: this.attachmentsArr,
    //         ...digitalSealingForm,
    //       };
    //       if (isEditForm) {

    //         this.submitSubscription = this.admissionFormApiService
    //           .onEditAddmissionFormData(formReq, this.requestId)
    //           .pipe(take(1))
    //           .subscribe(
    //             (res) => {
    //               this.admissionFormService.nextPage.next({
    //                 nextPage: true,
    //                 requestId: res.content['id'],
    //               });
    //               this.requestCoreService.setCustomerRequestStatus(
    //                 res.content['status']
    //               );
    //               this.countSubscription.unsubscribe();
    //               this.submitSubscription.unsubscribe();
    //               this.attachmentSubscription.unsubscribe();
    //               this.invoiceSubscription.unsubscribe();
    //               this.requestDetailSubscription.unsubscribe();
    //             },
    //             (error) => {
    //               this.translationService.toastrTranslation(
    //                 'error',
    //                 'toastr.enterValidValues'
    //               );
    //               this.submittedObj = null;
    //               this.admissionFormMappingService.count.next(0);
    //               this.admissionFormMappingService.attachmentArrForApi.next([]);
    //               this.submitSubscription.unsubscribe();
    //             }
    //           );
    //       } else {

    //         this.submitSubscription = this.admissionFormApiService
    //           .onSubmitAdmissionFormData(formReq)
    //           .pipe(take(1))
    //           .subscribe(
    //             (res) => {
    //               this.admissionFormService.nextPage.next({
    //                 nextPage: true,
    //                 requestId: res.content['id'],
    //               });
    //               this.requestCoreService.setCustomerRequestStatus(
    //                 res.content['status']
    //               );

    //               this.requestCoreService.setCurrentCustomerRequestId(
    //                 res.content['id']
    //               );
    //               return;
    //               /*  this.countSubscription.unsubscribe();
    //           this.submitSubscription.unsubscribe();
    //           this.attachmentSubscription.unsubscribe();
    //           this.invoiceSubscription.unsubscribe();
    //           this.requestDetailSubscription.unsubscribe();*/
    //             },
    //             (error) => {
    //               this.translationService.toastrTranslation(
    //                 'error',
    //                 'toastr.enterValidValues'
    //               );
    //               this.submittedObj = null;
    //               this.admissionFormService.nextPage.next({
    //                 nextPage: false,
    //                 requestId: null,
    //               });
    //               this.admissionFormMappingService.count.next(0);
    //               this.admissionFormMappingService.attachmentArrForApi.next([]);
    //             }
    //           );
    //       }
    //       this.admissionFormMappingService.count.next(0);
    //     }
    //   }
    // );
  }
}
