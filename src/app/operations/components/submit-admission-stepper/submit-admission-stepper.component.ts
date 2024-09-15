import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionFormComponent } from '@operations/pages/admission-form/admission-form.component';
import { DigitalSealingSubmitionComponent } from '@operations/pages/digital-sealing-submition/digital-sealing-submition.component';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';
import { RdfFormComponent } from '../rdf-form/rdf-form.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IsRequiredPipe } from '@shared/pipes/is-required.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { AdmissionFormUtilitiesService } from '@operations/services/admission-form/admission-form-utilities.service';
import { CompanyApiService } from '@shared/services/company.api.service';
import { AuthService } from 'app/core/services/auth.service';
import { TranslationService } from 'app/language/translation.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { ReviewerFormComponent } from '../reviewer-form/reviewer-form.component';
import { AdmissionFormModelsService } from '@operations/services/admission-form/admission-form-models.service';
import { AdmissionFormApiService } from '@operations/services/admission-form/admission-form-api.service';
import { CementCompanyRdfComponent } from '@operations/pages/cement-company-rdf/cement-company-rdf.component';
import { AdmissionFormService } from '@operations/services/admission-form/admission-form.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-submit-admission-stepper',
  standalone: true,
  imports: [
    CommonModule,
    AdmissionFormComponent,
    DigitalSealingSubmitionComponent,
    MatStepperModule,
    TranslateModule,
    RdfFormComponent,
    ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
    SubtitleComponent,
    SubmitButtonComponent,
    NzFormModule,
    NzInputModule,
    IsRequiredPipe,
    NzButtonModule,
    NzSelectModule,
    FormsModule,
    NzUploadModule,
    NzDatePickerModule,
    NzModalModule,
    ReviewerFormComponent,
    CementCompanyRdfComponent,
    RouterModule,
  ],
  templateUrl: './submit-admission-stepper.component.html',
  styleUrl: './submit-admission-stepper.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class SubmitAdmissionStepperComponent {
  role;
  checkRDFValue;
  selectedValue;
  statusNote;
  mainNote;
  reviewersList;
  statusArr;
  statusNoteLabel;
  requestId;
  requestRdf;
  hookDisabled = true;
  customerRequestData
  isCompanyActivated = false;
  url = environment.mediaUrl;
  ownerCompanies
  CustomerRequestForm = new FormGroup({
    country_id: new FormControl<number | undefined>(
      undefined,
      Validators.required
    ),
    company_id: new FormControl<string | undefined>("1", [Validators.required]),
    incoming_harbor_id: new FormControl<string>('', [Validators.required]),
    Shipment_date: new FormControl('', [Validators.required]),

    arrival_harbor_id: new FormControl<number | undefined>(
      undefined,
      Validators.required
    ),
    ship_name: new FormControl('', [Validators.required]),
    arrival_date: new FormControl('', [Validators.required]),
    total_weight_ton: new FormControl('', [Validators.required]),
    ton_price_num: new FormControl('', [Validators.required]),
    ton_price_char: new FormControl('', [Validators.required]),
    currency_id: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    coal_id: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),

    coal_price_num: new FormControl('', [Validators.required]),
    coal_price_char: new FormControl('', [Validators.required]),
    ton_currency_id: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    import_coal_company_id: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    unload_type_id: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    transfer_steps: new FormControl('', [Validators.required]),

    // approval
    expenses_approval: new FormControl<boolean>(false, [Validators.required]),
    commissioner_approval: new FormControl<boolean>(false, [
      Validators.required,
    ]),
    hook_approval: new FormControl<boolean>(false, [Validators.required]),

    // file
    invoice_file: new FormControl(null, [Validators.required]),

    // last files
    noteinsurance_policy_file: new FormControl(null, [Validators.required]), //done
    contract_file: new FormControl(null, [Validators.required]), //done
    registration_data_file: new FormControl(null, [Validators.required]), //done
    hook_approval_file: new FormControl(null),

    // formArrays
    iunload_company_data: new FormArray<
      FormGroup<{
        iunload_company_id: FormControl<string | undefined | null>;
        unload_company_approval_file: FormControl<File | undefined | null>;

        iunload_company_id_checker: FormControl<boolean>;
        unload_company_approval_file_checker: FormControl<boolean>;
      }>
    >([]),
    transport_company_data: new FormArray<
      FormGroup<{
        transport_company_id: FormControl<string | undefined | null>;
        transport_company_approval_file: FormControl<File | undefined | null>;

        transport_company_id_checker: FormControl<boolean>;
        transport_company_approval_file_checker: FormControl<boolean>;
      }>
    >([]),
    store_company_data: new FormArray<
      FormGroup<{
        store_company_id: FormControl<string | undefined | null>;
        store_company_approval_file: FormControl<File | undefined | null>;

        store_company_id_checker: FormControl<boolean>;
        store_company_approval_file_checker: FormControl<boolean>;
      }>
    >([]),

    centeral_store_company_data: new FormArray<
      FormGroup<{
        centeral_store_company_id: FormControl<string | undefined | null>;
        centeral_store_approval_file: FormControl<File | undefined | null>;

        centeral_store_company_id_checker: FormControl<boolean>;
        centeral_store_approval_file_checker: FormControl<boolean>;
      }>
    >([]),

    river_company_data: new FormArray<
      FormGroup<{
        river_company_id: FormControl<string | undefined | null>;
        river_company_approval_file: FormControl<File | undefined | null>;

        river_company_id_checker: FormControl<boolean>;
        river_company_approval_file_checker: FormControl<boolean>;
      }>
    >([]),

    company_id_checker: new FormControl<boolean>(false),
    country_id_checker: new FormControl<boolean>(false),
    incoming_harbor_id_checker: new FormControl<boolean>(false),
    Shipment_date_checker: new FormControl<boolean>(false),
    arrival_harbor_id_checker: new FormControl<boolean>(false),
    ship_name_checker: new FormControl<boolean>(false),
    arrival_date_checker: new FormControl<boolean>(false),
    total_weight_ton_checker: new FormControl<boolean>(false),
    ton_price_num_checker: new FormControl<boolean>(false),
    ton_price_char_checker: new FormControl<boolean>(false),
    currency_id_checker: new FormControl<boolean>(false),
    coal_id_checker: new FormControl<boolean>(false),

    coal_price_num_checker: new FormControl<boolean>(false),
    coal_price_char_checker: new FormControl<boolean>(false),
    ton_currency_id_checker: new FormControl<boolean>(false),
    import_coal_company_id_checker: new FormControl<boolean>(false),
    unload_type_id_checker: new FormControl<boolean>(false),
    transfer_steps_checker: new FormControl<boolean>(false),

    // file
    invoice_file_checker: new FormControl<boolean>(false),

    // last files
    noteinsurance_policy_file_checker: new FormControl<boolean>(false), //done
    contract_file_checker: new FormControl<boolean>(false), //done
    registration_data_file_checker: new FormControl<boolean>(false), //done
  });
  edit: boolean;

  addHookApprovalFileChecker() {
    if (this.hookDisabled) {
      (this.CustomerRequestForm as any).addControl(
        '_checker',
        new FormControl<boolean>(false)
      );
    } else {
      (this.CustomerRequestForm as any).removeControl(
        'hook_approval_file_checker'
      );
    }
  }

  companyStatus:any={if_company:false, is_active:false};
  gettingData = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private admissionFormUtilitiesService: AdmissionFormUtilitiesService,
    private companyApiService: CompanyApiService,
    private auth: AuthService,
    private translationService: TranslationService,
    private elementRef: ElementRef,
    private requestSubmittedService: RequestSubmittedService,
    private admissionFormModelsService: AdmissionFormModelsService,
    private admissionFormApiService: AdmissionFormApiService,
    private admissionFormService: AdmissionFormService,
  ) {
    this.addIunloadCompaniesFile();
    this.addTransportCompaniesFile();
    this.addStoreCompaniesFile();
    this.addCenteralStoreCompaniesFile();
    this.addRiverCompaniesFile();
    this.role = this.auth.userRole;
    this.getCurrencyArr();
    // this.checkRDF();
    this.statusArr = this.admissionFormModelsService.statusArr;
    this.statusNote = this.admissionFormModelsService.statusNote;
    this.mainNote = this.admissionFormModelsService.mainNote;
    this.reviewersList = this.admissionFormModelsService.reviewersList;
    
    this.gettingData = true;
    route.params.subscribe((params) => {
      if (params['id'] && params['id'] != 'new') {
        this.getRequestById(params['id']);
        this.requestId = params['id'];
        // this.CustomerRequestForm.disable()
        this.disableAllExceptCheckboxesAndNzSelect()
        this.edit=true
        this.checkRdf()
      }else{
        this.checkActive()
        this.checkRdf()
        
        this.ownerCompanies=localStorage.getItem('companyName')
      }
      
    });
    

    // this.companyStatus = JSON.parse(localStorage.getItem('companyStatus'));
    // if (this.companyStatus.if_company && this.companyStatus.is_active) {
    //   this.isCompanyActivated = true;
    // } else {
    //   this.isCompanyActivated = false;
    // }
  }
  


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addHookApprovalFileChecker();
    this.isCompanyActivated=JSON.parse(localStorage.getItem('activate'))
    this.companyStatus.if_company=JSON.parse(localStorage.getItem('ifCompany'))
  }
 

  addcomment(event) {
    alert(this.requestId);
  }

  checkActive(){
    this.requestSubmittedService.getCustomerRequests().subscribe({
      next: (res:any) => {
       this.checkRDFValue=res.data.is_rdf
      },
      
      error: (error) => {
       console.log(error);
      },
    });
  }

 
  getRequestById(id?) {
    this.requestSubmittedService.getCustomerRequestById(id).subscribe({
      next: (data) => {
        this.setRequestData(data['data']);
        this.checkRDFValue = data['data']['is_rdf'];
        console.log(this.checkRDFValue);
        
        this.customerRequestData = data['data'];
        this.CustomerRequestForm.get('company_id')?.setValue( '1');
        this.gettingData = false;
        this.ownerCompanies=data['data'].company_name
      },
      error: (error) => {
        this.translationService.toastrTranslation(
          'error',
          error['error']['message']
        );
        this.gettingData = false;
      },
    });
  }

  setRequestData(requestData) {
    this.CustomerRequestForm.reset();
    if (requestData) {
      // this.customerRequestData = requestData;
      // this.onUnloadTypeChange(requestData?.unload_type_id);
      this.populateFormArrays(requestData);
      console.log(requestData);
      
      this.CustomerRequestForm.patchValue(
        {
          company_id: requestData?.company_id,
          country_id: requestData?.country_id,
          incoming_harbor_id: requestData?.incoming_harbor_id,
          Shipment_date: requestData?.shipment_date,
          arrival_harbor_id: requestData?.arrival_harbor_id,
          ship_name: requestData?.ship_name,
          arrival_date: requestData?.arrival_date,
          total_weight_ton: requestData?.total_weight_ton,
          ton_price_num: requestData?.ton_price_num,
          ton_price_char: requestData?.ton_price_char,
          currency_id: requestData?.currency_id,
          coal_id: requestData?.coal_id,

          coal_price_num: requestData?.coal_price_num,
          coal_price_char: requestData?.coal_price_char,
          ton_currency_id: requestData?.ton_currency_id,
          import_coal_company_id: requestData?.import_coal_company_id,
          unload_type_id: requestData?.unload_type_id,
          transfer_steps: requestData?.transfer_steps,

          // approval
          expenses_approval: requestData?.expenses_approval,
          commissioner_approval: requestData?.commissioner_approval,
          hook_approval: requestData?.hook_approval,

          // file
          invoice_file: requestData?.invoice_file,

          // last files
          noteinsurance_policy_file: requestData?.noteinsurance_policy_file, //done
          contract_file: requestData?.contract_file, //done
          registration_data_file: requestData?.registration_data_file, //done
          hook_approval_file: requestData?.hook_approval_file,
        },
        { emitEvent: false }
      );
      console.log(this.CustomerRequestForm.value);
      
    }
  }

  checkRdf(){
    this.requestSubmittedService.checkRdfWithoutId().subscribe((res:any)=>
      {
        console.log(res);
        if (res.check_rdf==1) {
          this.checkRDFValue=true
        } else {
          this.checkRDFValue=false
        }
      })
  }

  populateFormArrays(requestData: any) {
    this.populateIunloadCompanies(requestData?.iunload_company_data);
    this.populateTransportCompanies(requestData?.transport_company_data);
    this.populateStoreCompanies(requestData?.store_company_data);
    this.populateCentralStoreCompanies(
      requestData?.centeral_store_company_data
    );
    this.populateRiverCompanies(requestData?.river_company_data);
  }

  populateIunloadCompanies(dataArray: any[]) {
    this.iunloadCompaniesData.clear(); // Clear any existing form groups
    dataArray?.forEach((data) => {
      this.iunloadCompaniesData.push(
        new FormGroup({
          iunload_company_id: new FormControl<string | undefined | null>(
            data.iunload_company_id || '',
            Validators.required
          ),
          unload_company_approval_file: new FormControl<
            File | undefined | null
          >(data.unload_company_approval_file || null),
          iunload_company_id_checker: new FormControl<boolean>(
            data.iunload_company_id_checker || false
          ),
          unload_company_approval_file_checker: new FormControl<boolean>(
            data.unload_company_approval_file_checker || false
          ),
        })
      );
    });
  }

  populateTransportCompanies(dataArray: any[]) {
    this.transportCompaniesData.clear();
    dataArray?.forEach((data) => {
      this.transportCompaniesData.push(
        new FormGroup({
          // Define the form controls based on your data structure
          transport_company_id: new FormControl<string | undefined | null>(
            data.transport_company_id || '',
            Validators.required
          ),
          transport_company_approval_file: new FormControl<
            File | undefined | null
          >(data.transport_company_approval_file || null),
          transport_company_id_checker: new FormControl<boolean>(
            data.transport_company_id_checker || false
          ),
          transport_company_approval_file_checker: new FormControl<boolean>(
            data.transport_company_approval_file_checker || false
          ),
        })
      );
    });
  }

  populateStoreCompanies(dataArray: any[]) {
    this.storeCompaniesData.clear();
    dataArray?.forEach((data) => {
      this.storeCompaniesData.push(
        new FormGroup({
          // Define the form controls based on your data structure
          store_company_id: new FormControl<string | undefined | null>(
            data.store_company_id || '',
            Validators.required
          ),
          store_company_approval_file: new FormControl<File | undefined | null>(
            data.store_company_approval_file || null
          ),
          store_company_id_checker: new FormControl<boolean>(
            data.store_company_id_checker || false
          ),
          store_company_approval_file_checker: new FormControl<boolean>(
            data.store_company_approval_file_checker || false
          ),
        })
      );
    });
  }

  populateCentralStoreCompanies(dataArray: any[]) {
    this.centeralStoreCompaniesData.clear();
    dataArray?.forEach((data) => {
      this.centeralStoreCompaniesData.push(
        new FormGroup({
          // Define the form controls based on your data structure
          centeral_store_company_id: new FormControl<string | undefined | null>(
            data.centeral_store_company_id || '',
            Validators.required
          ),
          centeral_store_approval_file: new FormControl<
            File | undefined | null
          >(data.centeral_store_approval_file || null),
          centeral_store_company_id_checker: new FormControl<boolean>(
            data.centeral_store_company_id_checker || false
          ),
          centeral_store_approval_file_checker: new FormControl<boolean>(
            data.centeral_store_approval_file_checker || false
          ),
        })
      );
    });
  }

  populateRiverCompanies(dataArray: any[]) {
    this.riverCompaniesData.clear();
    dataArray?.forEach((data) => {
      this.riverCompaniesData.push(
        new FormGroup({
          river_company_id: new FormControl(
            data.river_company_id,
            Validators.required
          ),
          river_company_approval_file: new FormControl<File | undefined | null>(
            data.river_company_approval_file || null
          ),

          river_company_id_checker: new FormControl<boolean>(false),
          river_company_approval_file_checker: new FormControl<boolean>(false),
        })
      );
    });
  }

  // ===========================================================================

  ngAfterViewInit(): void {
    // Ensure that the DOM is fully loaded before querying elements
    this.disableAllExceptCheckboxesAndNzSelect();
  }

  disableAllExceptCheckboxesAndNzSelect() {
    if (this.role != 'customer') {
      const form = this.elementRef.nativeElement.querySelector('nz-form'); // Select the form element

      if (form) {
        const inputs = form.querySelectorAll('input'); // Select all input elements within the form

        // Disable all inputs except checkboxes
        inputs.forEach((input: HTMLInputElement) => {
          if (input.type !== 'checkbox') {
            input.disabled = true;
          }
        });
        this.CustomerRequestForm.get('expenses_approval').disable()
        this.CustomerRequestForm.get('commissioner_approval').disable()
        this.CustomerRequestForm.get('hook_approval').disable()
      } else {
        console.error('Form element not found.');
      }
    }
  }

  downloadURI(field) {
    // var link = document.createElement('a');
    // link.download = field.fieldName;
    // link.href = field.value;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    console.log(field);
  }

  // iunload
  onSelectIunloadCompaniesFile(info: File[], formC: FormControl) {
    formC.patchValue(info[0]);
    formC.updateValueAndValidity({ onlySelf: true });
  }
  get iunloadCompaniesData() {
    return this.CustomerRequestForm.controls.iunload_company_data;
  }
  addIunloadCompaniesFile(): void {
    this.iunloadCompaniesData.push(
      new FormGroup({
        iunload_company_id: new FormControl<string | undefined | null>(
          '',
          Validators.required
        ),
        unload_company_approval_file: new FormControl<File | undefined | null>(
          null
        ),

        iunload_company_id_checker: new FormControl<boolean>(false),
        unload_company_approval_file_checker: new FormControl<boolean>(false),
      })
    );
  }
  removeIunloadCompaniesFile(index) {
    this.iunloadCompaniesData.removeAt(index);
  }

  // transport
  transportCompaniesFileName;
  onSelectTransportCompaniesFile(info: File[], formC: FormControl) {
    formC.patchValue(info[0]);
    formC.updateValueAndValidity({ onlySelf: true });
  }
  get transportCompaniesData() {
    return this.CustomerRequestForm.controls.transport_company_data;
  }
  addTransportCompaniesFile(): void {
    this.transportCompaniesData.push(
      new FormGroup({
        transport_company_id: new FormControl('', Validators.required),
        transport_company_approval_file: new FormControl(null),

        transport_company_id_checker: new FormControl<boolean>(false),
        transport_company_approval_file_checker: new FormControl<boolean>(
          false
        ),
      })
    );
  }
  removeTransportCompaniesFile(index) {
    this.transportCompaniesData.removeAt(index);
  }

  // store
  storeCompaniesFileName;
  onSelectStoreCompaniesFile(info: File, formC: FormControl) {
    formC.patchValue(info[0]);
    formC.updateValueAndValidity({ onlySelf: true });
  }
  get storeCompaniesData() {
    return this.CustomerRequestForm.controls.store_company_data;
  }
  addStoreCompaniesFile(): void {
    this.storeCompaniesData.push(
      new FormGroup({
        store_company_id: new FormControl('', Validators.required),
        store_company_approval_file: new FormControl(null),

        store_company_id_checker: new FormControl<boolean>(false),
        store_company_approval_file_checker: new FormControl<boolean>(false),
      })
    );
  }
  removeStoreCompaniesFile(index) {
    this.storeCompaniesData.removeAt(index);
  }

  // centeral store
  onSelectCenteralStoreCompaniesFile(info: File, formC: FormControl) {
    formC.patchValue(info[0]);
    formC.updateValueAndValidity({ onlySelf: true });
  }
  get centeralStoreCompaniesData() {
    return this.CustomerRequestForm.controls.centeral_store_company_data;
  }
  addCenteralStoreCompaniesFile(): void {
    this.centeralStoreCompaniesData.push(
      new FormGroup({
        centeral_store_company_id: new FormControl('', Validators.required),
        centeral_store_approval_file: new FormControl(null),

        centeral_store_company_id_checker: new FormControl<boolean>(false),
        centeral_store_approval_file_checker: new FormControl<boolean>(false),
      })
    );
  }
  removeCenteralStoreCompaniesFile(index) {
    this.centeralStoreCompaniesData.removeAt(index);
  }

  // river
  onSelectRiverCompaniesFile(info: File, formC: FormControl) {
    formC.patchValue(info[0]);
    formC.updateValueAndValidity({ onlySelf: true });
  }

  get riverCompaniesData() {
    return this.CustomerRequestForm.controls.river_company_data;
  }

  addRiverCompaniesFile(): void {
    this.riverCompaniesData.push(
      new FormGroup({
        river_company_id: new FormControl('', Validators.required),
        river_company_approval_file: new FormControl(null),

        river_company_id_checker: new FormControl<boolean>(false),
        river_company_approval_file_checker: new FormControl<boolean>(false),
      })
    );
  }

  removeRiverCompaniesFile(index) {
    this.riverCompaniesData.removeAt(index);
  }

  // invoice
  invoiceFileName;
  onSelectInvoiceFile(info: File) {
    if (info[0]) {
      this.invoiceFileName = info[0].name;
      this.CustomerRequestForm.get('invoice_file').patchValue(info[0]);
    }
  }

  // noteinsurance policy
  noteinsurancePolicyFileName;
  onSelectNoteinsurancePolicyFile(info: File) {
    if (info[0]) {
      this.noteinsurancePolicyFileName = info[0].name;
      this.CustomerRequestForm.get('noteinsurance_policy_file').patchValue(
        info[0]
      );
    }
  }

  // contract
  contractFileName;
  onSelectContractFile(info: File) {
    if (info[0]) {
      this.contractFileName = info[0].name;
      this.CustomerRequestForm.get('contract_file').patchValue(info[0]);
    }
  }

  // registration
  registrationDataFileName;
  onSelectRegistrationDataFile(info: File) {
    if (info[0]) {
      this.registrationDataFileName = info[0].name;
      this.CustomerRequestForm.get('registration_data_file').patchValue(
        info[0]
      );
    }
  }

  // hook
  hookApprovalFileName;
  onSelectHookApprovalFile(info: File) {
    if (info[0]) {
      this.hookApprovalFileName = info[0].name;
      this.CustomerRequestForm.get('hook_approval_file').patchValue(info[0]);
    }
  }

  // get arrays options.....

  // currency
  gettingCurrency: boolean = false;
  currency = [];
  getCurrencyArr() {
    this.gettingCurrency = true;
    this.admissionFormUtilitiesService.getCurrency().subscribe((res) => {
      this.currency = res['data'];
      this.gettingCurrency = false;
      this.getOwnerCompaniesArr();
    });
  }

  // companies
  gettingCompanies: boolean = false;
  getOwnerCompaniesArr() {
    // this.gettingCompanies = true;
    this.companyApiService
    this.getUnloadType();
      // .getCompanyByOwnerId(this.auth.userId)
      // .subscribe((res) => {
        // this.gettingCompanies = false;
        // this.ownerCompanies = res['companies'];
      // });
  }

  // unload type
  gettingUnloadType: boolean = false;
  unloadType;
  getUnloadType() {
    this.gettingUnloadType = true;
    this.admissionFormUtilitiesService.getUnloadType().subscribe((res) => {
      this.unloadType = res['data'];
      this.gettingUnloadType = false;
      this.getCountryArr();
    });
  }

  // country
  gettingCountry: boolean = false;
  countries;
  getCountryArr() {
    this.gettingCountry = true;
    this.admissionFormUtilitiesService.getCountry().subscribe((res) => {
      this.countries = res['countries'];
      this.gettingCountry = false;
      this.getHarborArr();
    });
  }

  // harbor
  gettingHarbor: boolean = false;
  harborArr;
  getHarborArr() {
    this.gettingHarbor = true;
    this.admissionFormUtilitiesService.getHarborList().subscribe((res) => {
      this.harborArr = res['data'];
      this.gettingHarbor = false;
      this.getCoalType();
    });
  }

  // coal
  gettingCoal: boolean = false;
  coalArr;
  getCoalType() {
    this.gettingCoal = true;
    this.admissionFormUtilitiesService.getCoalType().subscribe((res) => {
      this.coalArr = res['data'];
      this.gettingCoal = false;
      this.getUnloadCompany();
    });
  }

  // unload
  gettingUnload: boolean = false;
  unloadCompanies;
  getUnloadCompany() {
    this.gettingUnload = true;
    this.admissionFormUtilitiesService.getUnloadMethod().subscribe((res) => {
      this.unloadCompanies = res['data'];
      this.gettingUnload = false;
      this.getStoreCompany();
    });
  }

  // store
  gettingStore: boolean = false;
  stores;
  getStoreCompany() {
    this.gettingStore = true;
    this.admissionFormUtilitiesService.getStoreCompany().subscribe((res) => {
      this.stores = res['data'];
      this.gettingStore = false;
      this.getCentralStoreCompany();
    });
  }

  // central store
  gettingCentralStore: boolean = false;
  centralStores;
  getCentralStoreCompany() {
    this.gettingCentralStore = true;
    this.admissionFormUtilitiesService
      .getCentralStoreCompany()
      .subscribe((res) => {
        this.centralStores = res['data'];
        this.gettingCentralStore = false;
        this.getTransportCompany();
      });
  }

  // transport
  gettingTransport: boolean = false;
  transportCompanies;
  getTransportCompany() {
    this.gettingTransport = true;
    this.admissionFormUtilitiesService
      .getTransportCompany()
      .subscribe((res) => {
        this.transportCompanies = res['data'];
        this.gettingTransport = false;
        this.getRiverCompany();
      });
  }

  // river
  gettingRiver: boolean = false;
  riverCompanies;
  getRiverCompany() {
    this.gettingRiver = true;
    this.admissionFormUtilitiesService.getRiverCompany().subscribe((res) => {
      this.riverCompanies = res['data'];
      this.gettingRiver = false;
      // this.getImportCoalCompany();
    });
  }

  // importCoal
  // gettingImportCoal: boolean = false;
  // importCoalCompanies;
  // getImportCoalCompany() {
  //   this.gettingImportCoal = true;
  //   this.admissionFormUtilitiesService
  //     .getImportCoalCompany()
  //     .subscribe((res) => {
  //       this.importCoalCompanies = res['data'];
  //       this.gettingImportCoal = false;
  //     });
  // }

  // ================================================================================

  addCompanyForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    envNumber: new FormControl<string>('', [Validators.required]),
    dateRelease: new FormControl<string>('', [Validators.required]),
    companyFile: new FormControl(null, [Validators.required]),
    permitNumber: new FormControl<string>('', [Validators.required]),
    permitDateFrom: new FormControl<string>('', [Validators.required]),
    permitDateTo: new FormControl<string>('', [Validators.required]),
    permitFile: new FormControl(null, [Validators.required]),
  });

  // companyFile
  companyFileName;
  onSelectCompanyFile(info: File) {
    if (info[0]) {
      this.companyFileName = info[0].name;
      this.addCompanyForm.get('companyFile').patchValue(info[0]);
    }
  }

  selectedName;
  onCompanyChange(selectedValue: string, selectName): void {
    if (selectedValue === 'addCompany') {
      this.selectedName = selectName;
      this.showModal();
    }
  }

  permitFileName;
  onSelectPermitFile(info: File) {
    if (info[0]) {
      this.permitFileName = info[0].name;
      this.addCompanyForm.get('permitFile').patchValue(info[0]);
    }
  }

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (this.addCompanyForm.valid) {
      const formData = this.addCompanyForm.value;
      const form = new FormData();

      form.append('name', formData.name);
      form.append('approval_num', formData.envNumber);
      if (formData.companyFile) {
        form.append('attach', formData.companyFile, formData.companyFile.name);
      }
      form.append('from', formData.permitDateFrom);
      form.append('to', formData.permitDateTo);
      form.append('status_num', formData.permitNumber);
      form.append('date', formData.dateRelease);
      if (formData.permitFile) {
        form.append(
          'status_attach',
          formData.permitFile,
          formData.permitFile.name
        );
      }

      this.checkEndPointName(this.selectedName, form);
    } else {
      Object.values(this.addCompanyForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.translationService.toastrTranslation(
        'error',
        'toastr.enterValidValues'
      );
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onUnloadTypeChange(event: number) {
    const hookApprovalFileControl =
      this.CustomerRequestForm.get('hook_approval_file');

    if (event === 3 || event === 4) {
      if (hookApprovalFileControl) {
        // Add the desired validator, e.g., making it required
        hookApprovalFileControl.setValidators([Validators.required]);

        // Update the control's validity after setting the validator
        hookApprovalFileControl.updateValueAndValidity();
      }
      this.hookDisabled = false;
    } else {
      if (hookApprovalFileControl) {
        // Remove the validators if the event is not 3 or 4
        hookApprovalFileControl.clearValidators();

        // Update the control's validity after clearing the validators
        hookApprovalFileControl.updateValueAndValidity();
      }
      this.hookDisabled = true;
    }
  }

  // ================================================================================

  // checkRDF() {
  //   this.admissionFormUtilitiesService.checkRDF().subscribe((res) => {
  //     if (res['check_rdf'] == 0) {
  //       this.checkRDFValue = false;
  //     } else {
  //       this.checkRDFValue = true;
  //     }
  //   });
  // }

  // submit form
  loading = false;
  onSubmit() {
    if (this.role === 'customer') {
      if(this.requestId){
        this.router.navigateByUrl('operations/rdf/'+this.requestId);
      }
      else{
      // Stop here if form is invalid
      // if (this.CustomerRequestForm.invalid) {
      //   Object.values(this.CustomerRequestForm.controls).forEach((control) => {
      //     if (control.invalid) {
      //       control.markAsDirty();
      //       control.updateValueAndValidity({ onlySelf: true });
      //     }
      //   });
      //   this.translationService.toastrTranslation(
      //     'error',
      //     'toastr.enterValidValues'
      //   );
      //   this.scroll();
      //   return;
      // } else {
        // Create a form value object without checkers controls
        const customerFormValue = this.extractFormWithoutCheckers(
          this.CustomerRequestForm.value
        );
        this.checkRdf()
        if (this.checkRDFValue) {
          console.log('customer form value', customerFormValue);
          this.router.navigateByUrl('operations/rdf');
          this.admissionFormUtilitiesService.requestFormData(customerFormValue);
        } else {
          this.loading = true;
          this.admissionFormUtilitiesService
            .sentReqWithoutRdf(customerFormValue)
            .subscribe(
              (response) => {
                this.loading = false;
                this.translationService.toastrTranslation(
                  'success',
                  response['message']
                );
                this.router.navigateByUrl('operations/requestsSubmitted');
              },
              (error) => {
                this.loading = false;
                this.translationService.toastrTranslation(
                  'error',
                  'toastr.enterValidValues'
                );
              }
            );
        }
      }
      // }
    } else {
      this.checkRdf()
      if (this.checkRDFValue) {
        this.router.navigateByUrl(`operations/rdf/${this.requestId}`);
      } else {
        // Create a form value object with only checkers controls
        this.admissionFormService.testCheckForm(this.CustomerRequestForm);
      }
    }
  }

  // Helper function to extract form controls without checkers
  extractFormWithoutCheckers(formValue: any) {
    const result = {};
    for (const key in formValue) {
      if (!key.includes('_checker')) {
        result[key] = formValue[key];
      }
    }
    return result;
  }

  // Helper function to extract only checkers controls
  extractCheckersOnly(formValue: any) {
    const result = {};
    for (const key in formValue) {
      if (key.includes('_checker')) {
        result[key] = formValue[key];
      }
    }
    return result;
  }

  navigateToRDF() {
    this.router.navigateByUrl('operations/rdf');
  }

  scroll() {
    window.scroll(0, 0);
  }

  // ============ Add companies  ==================

  checkEndPointName(name, formData) {
    if (name == 'iunload_company_id') {
      this.addRequestCompany('unload-company', formData);
    } else if (name == 'store_company_id') {
      this.addRequestCompany('store-company', formData);
    } else if (name == 'centeral_store_company_id') {
      this.addRequestCompany('centeral-store-company', formData);
    } else if (name == 'transport_company_id') {
      this.addRequestCompany('transport-company', formData);
    } else if (name == 'river_company_id') {
      this.addRequestCompany('river-company', formData);
    }
  }

  addRequestCompany(endPoint, formData) {
    this.isOkLoading = true;
    this.admissionFormApiService
      .requestAddCompany(endPoint, formData)
      .subscribe({
        next: (res) => {
          this.translationService.toastrTranslation('success', res['msg']);
          this.getCurrencyArr();
          this.addCompanyForm.reset();
          this.companyFileName = '';
          this.permitFileName = '';
          this.isOkLoading = false;
          this.isVisible = false;
        },
        error: (err) => {
          this.isOkLoading = false;
          this.translationService.toastrTranslation('error', err['msg']);
        },
      });
  }
  check3=false
  checkAll(event:any){
    let isChecked = event.target.checked
      this.CustomerRequestForm.get('noteinsurance_policy_file_checker')?.setValue(isChecked);
      this.CustomerRequestForm.get('contract_file_checker')?.setValue(isChecked);
      this.CustomerRequestForm.get('registration_data_file_checker')?.setValue(isChecked);
  }
  
}
