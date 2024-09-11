import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { BtnComponent } from '@shared/components/buttons/btn/btn.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { CementCompanyRdfService } from '@operations/services/cement-company-rdf.service';
import { AuthService } from 'app/core/services/auth.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IsRequiredPipe } from '@shared/pipes/is-required.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { TranslationService } from 'app/language/translation.service';
import { AdmissionFormUtilitiesService } from '@operations/services/admission-form/admission-form-utilities.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { environment } from 'environments/environment';
import { AdmissionFormModelsService } from '@operations/services/admission-form/admission-form-models.service';
import { AdmissionFormService } from '@operations/services/admission-form/admission-form.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-cement-company-rdf',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    RdfFormComponent,
    ReactiveFormsModule,
    DynamicFormComponent,
    BtnDropdownComponent,
    BtnComponent,
    ReviewerFormComponent,
    NzRadioModule,
    NzFormModule,
    NzInputModule,
    IsRequiredPipe,
    NzButtonModule,
    NzSelectModule,
    FormsModule,
    NzUploadModule,
    NzDatePickerModule,
    RouterModule,
  ],
  templateUrl: './cement-company-rdf.component.html',
  styleUrl: './cement-company-rdf.component.scss',
})
export class CementCompanyRdfComponent {
  // @ViewChild('rdfForm') rdfForm!: ElementRef;
  reviewerForm: boolean;
  mainNote;
  reviewer: string = 'مصطفى محمد';
  reviewersList;
  statusArr;
  statusNote;

  requestId;

  url = environment.mediaUrl;

  role;

  rdfForm = new FormGroup({
    
    rdf_data: new FormArray<
      FormGroup<{
        provider_name: FormControl<string | undefined | null>;
        date: FormControl<string | undefined | null>;
        weight_in_ton: FormControl<number | undefined | null>;
        invoice: FormControl<File | undefined | null>;

        provider_name_checker: FormControl<boolean>;
        date_checker: FormControl<boolean>;
        weight_in_ton_checker: FormControl<boolean>;
        invoice_checker: FormControl<boolean>;
      }>
    >([]),

    total_weight_ton: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    moreOrEqualPercent: new FormControl<string>('', [Validators.required]),
    company_confirm: new FormControl<boolean>(false, [Validators.required]),

    total_weight_ton_checker: new FormControl<boolean>(false),
    moreOrEqualPercent_checker: new FormControl<boolean>(false),
  });

  constructor(
    protected auth: AuthService,
    private route: ActivatedRoute,
    private translationService: TranslationService,
    private admissionFormUtilitiesService: AdmissionFormUtilitiesService,
    private router: Router,
    private requestSubmittedService: RequestSubmittedService,
    private elementRef: ElementRef,
    private admissionFormModelsService: AdmissionFormModelsService,
    private admissionFormService: AdmissionFormService,
    private location :Location
  ) {
    this.statusArr = this.admissionFormModelsService.statusArr;
    this.statusNote = this.admissionFormModelsService.statusNote;
    this.mainNote = this.admissionFormModelsService.mainNote;
    this.reviewersList = this.admissionFormModelsService.reviewersList;

    this.role = auth.userRole;
    this.addInvoiceFile();

    route.params.subscribe((params) => {
      if (params['id'] && params['id'] != 'new') {
        // this.rdfForm.disable()
        // this.rdfForm.get('rdf_data').disable()
        this.getRequestById(params['id']);
        this.requestId = params['id'];
      }
    });
  }

  addComment(e) {
    console.log('e', e);
  }

  customerRequestData;
  getRequestById(id) {
    this.requestSubmittedService.getCustomerRequestById(id).subscribe({
      next: (data) => {
        this.setRequestData(data['data']);
        this.customerRequestData = data['data'];
      },
      error: (error) => {
        this.translationService.toastrTranslation(
          'error',
          error['error']['message']
        );
      },
    });
  }

  setRequestData(requestData) {
    this.rdfForm.reset();
    if (requestData) {
      this.populateInvoiceData(requestData.rdf);
      console.log(requestData);
      
      this.rdfForm.patchValue(
        {
          rdf_data: requestData?.rdf || [],
          total_weight_ton: requestData?.rdf_total[0].total_weight_ton || '',

          moreOrEqualPercent:
          requestData?.rdf_total[0].moreOrEqualPercent.toString() || '',
            
          company_confirm: requestData?.rdf_total[0].company_confirm || false,
        },
        { emitEvent: false }
      );
    }
  }

  populateInvoiceData(dataArray: any[]) {
    this.invoiceData.clear(); // Clear any existing form groups
    dataArray?.forEach((data) => {
      this.invoiceData.push(
        new FormGroup({
          provider_name: new FormControl<string | undefined | null>(
            data.provider_name || ''
          ),
          date: new FormControl<string | undefined | null>(data.date || ''),
          weight_in_ton: new FormControl<number | undefined | null>(
            data.weight_in_ton || undefined
          ),
          invoice: new FormControl<File | undefined | null>(
            data.invoice || null
          ),

          provider_name_checker: new FormControl<boolean>(false),
          date_checker: new FormControl<boolean>(false),
          weight_in_ton_checker: new FormControl<boolean>(false),
          invoice_checker: new FormControl<boolean>(false),
        })
      );
    });
  }

  // Invoice
  onSelectInvoiceFile(info: File, formC: FormControl) {
    formC.patchValue(info[0]);
    formC.updateValueAndValidity({ onlySelf: true });
  }

  get invoiceData() {
    return this.rdfForm.controls.rdf_data;
  }

  addInvoiceFile(): void {
    this.invoiceData.push(
      new FormGroup({
        provider_name: new FormControl<string | undefined | null>(''),
        date: new FormControl<string | undefined | null>(''),
        weight_in_ton: new FormControl<number | undefined | null>(undefined),
        invoice: new FormControl<File | undefined | null>(null),

        provider_name_checker: new FormControl<boolean>(false),
        date_checker: new FormControl<boolean>(false),
        weight_in_ton_checker: new FormControl<boolean>(false),
        invoice_checker: new FormControl<boolean>(false),
      })
    );
  }
  removeInvoiceFile(index) {
    this.invoiceData.removeAt(index);
  }

  loading = false;

  onSubmit() {
    console.log(this.rdfForm.value);
    
    if (this.role === 'customer') {
      // Create a form value object without checkers controls
      const customerFormValue = this.extractFormWithoutCheckers(this.rdfForm);
      console.log(customerFormValue);
      
      // Stop here if form is invalid
      if (this.rdfForm.invalid) {
        Object.values(this.rdfForm.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
        this.translationService.toastrTranslation(
          'error',
          'toastr.enterValidValues'
        );
        return;
      } else {
        this.loading = true;

        // Call the service and handle the response with async/await or promise
        this.admissionFormUtilitiesService
          .requestRDFData(customerFormValue)
          .subscribe(
            (response) => {
              this.loading = false;
              if (response.status) {
                this.translationService.toastrTranslation(
                  'success',
                  response.msg
                );
                this.router.navigateByUrl('operations/requestsSubmitted');
              } else {
                this.translationService.toastrTranslation(
                  'error',
                  response.msg
                );
              }
            },
            (error) => {
              this.loading = false;
              this.translationService.toastrTranslation(
                'error',
                'An error occurred while submitting the request.'
              );
              console.error('Error:', error);
            }
          );
      }
    } else {
      // Create a form value object with only checkers controls
      this.admissionFormService.testCheckForm(this.rdfForm);
      // const checkersFormValue = this.extractCheckersOnly(this.rdfForm);

      // const allTrue = Object.values(checkersFormValue).every(
      //   (value) => value === true
      // );

      // console.log('allTrue', allTrue);

      // console.log('checkersFormValue', checkersFormValue);
    }
  }

  ngAfterViewInit(): void {
    // Ensure that the DOM is fully loaded before querying elements
    // this.disableAllExceptCheckboxesAndNzSelect();
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
      } else {
        console.error('Form element not found.');
      }
    }
  }

  // Helper function to extract form controls without checkers
  extractFormWithoutCheckers(formGroup: FormGroup): any {
    const result: any = {};

    function extractControls(
      control: AbstractControl,
      result: any,
      prefix: string = ''
    ) {
      if (control instanceof FormGroup) {
        console.log(control.controls);
        
        Object.keys(control.controls).forEach((key) => {
          const subControl = control.controls[key];
          console.log(subControl);
          const currentKey = prefix ? `${prefix}[${key}]` : key;
          console.log(currentKey);
          
          if (
            subControl instanceof FormGroup ||
            subControl instanceof FormArray
          ) {
            extractControls(subControl, result, currentKey);
          } else if (!key.includes('_checker')) {
            result[currentKey] = subControl.value;
          }
        });
      } else if (control instanceof FormArray) {
          control.controls.forEach((subControl, index) => {
          extractControls(subControl, result, `rdf_data[${index}]`);
        });
      }
    }

    extractControls(formGroup, result);
    return result;
  }

  // Helper function to extract only checkers controls
  extractCheckersOnly(formGroup: FormGroup): any {
    const result: any = {};

    function extractCheckers(
      control: AbstractControl,
      result: any,
      prefix: string = ''
    ) {
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((key) => {
          const subControl = control.controls[key];
          const currentKey = prefix ? `${prefix}[${key}]` : key;
          if (
            subControl instanceof FormGroup ||
            subControl instanceof FormArray
          ) {
            extractCheckers(subControl, result, currentKey);
          } else if (key.includes('_checker')) {
            result[currentKey] = subControl.value;
          }
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach((subControl, index) => {
          extractCheckers(subControl, result, `rdf_data[${index}]`);
        });
      }
    }

    extractCheckers(formGroup, result);
    return result;
  }

  get rdfData(): FormArray {
    return this.rdfForm.get('rdf_data') as FormArray;
  }

  checkAll(event:any){
    let isChecked = event.target.checked
    this.rdfData.controls.forEach((group: FormGroup) => {
      group.get('provider_name_checker')?.setValue(isChecked);
      group.get('date_checker')?.setValue(isChecked);
      group.get('weight_in_ton_checker')?.setValue(isChecked);
      group.get('invoice_checker')?.setValue(isChecked);
    });
    
  }
  checkAll2(event:any){
    let isChecked = event.target.checked
    this.rdfForm.get('moreOrEqualPercent_checker')?.setValue(isChecked);
  }
  previous(){
    this.location.back()
  }
}
