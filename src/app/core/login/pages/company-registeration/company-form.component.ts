import { TranslationService } from 'app/language/translation.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
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
import { RegisterCompanyService } from '@login/services/company-registeration/register-company.service';
import { UtilitiesApiService } from '@shared/services/utilities.api.service';
import { CompanyType } from '@shared/model/company-type';
import { ActivityType } from '@shared/model/activity-type';
import { Country } from '@shared/model/gov-response';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IsRequiredPipe } from '@shared/pipes/is-required.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    CommonModule,
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
    NzButtonModule,
    NzUploadModule,
    NzDatePickerModule,
  ],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  companyForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    manager_name: new FormControl('', [Validators.required]),
    company_type_id: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    activity_id: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    purpose_of_use: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city_id: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/),
    ]),
    code: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),

    environmental_approval_data: new FormArray<
      FormGroup<{
        environmental_approval_num: FormControl<string | undefined | null>;
        valid_from: FormControl<string | undefined | null>;
        file: FormControl<File | undefined | null>;
        lat: FormControl<string | undefined | null>;
        lan: FormControl<string | undefined | null>;
      }>
    >([]),

    industrial_registration_number: new FormControl(''),
    industrial_registration_file: new FormControl<File | undefined>(undefined),
    industrial_registration_from: new FormControl(''),
    industrial_registration_to: new FormControl(''),

    status_file: new FormArray<
      FormGroup<{
        approve_number: FormControl<string | undefined | null>;
        status_file: FormControl<File | undefined | null>;
        from: FormControl<string | undefined | null>;
        to: FormControl<string | undefined | null>;
      }>
    >([]),

    quota: new FormControl<number | undefined>(undefined, [
      Validators.required,
    ]),
    quota_from: new FormControl('', [Validators.required]),
    quota_to: new FormControl('', [Validators.required]),
  });

  industrialFileName;
  onSelectIndustrialFile(info: File) {
    if (info[0]) {
      this.industrialFileName = info[0].name;
      this.companyForm.controls.industrial_registration_file.patchValue(
        info[0]
      );
    }
  }

  constructor(
    private registerCompanyService: RegisterCompanyService,
    private utilApiService: UtilitiesApiService,
    private router: Router,
    private translationService: TranslationService,
    private request: RequestSubmittedService,
  ) {}

  ngOnInit(): void {
    this.initFormWithRequiredData();
    this.addEnvironmentalApproval();
    this.addStatusFile();
  }

  onSelectEnvironmentalApprovalDataFile(info: File[], formC: FormControl) {
    formC.patchValue(info[0]);
    formC.updateValueAndValidity({ onlySelf: true });
  }

  get environmentalApprovalData() {
    return this.companyForm.controls.environmental_approval_data;
  }
  removeEnvironmentalApproval(index: number): void {
    this.environmentalApprovalData.removeAt(index);
  }

  addEnvironmentalApproval(): void {
    this.environmentalApprovalData.push(
      new FormGroup({
        environmental_approval_num: new FormControl('', Validators.required),
        valid_from: new FormControl<string | undefined | null>(
          '',
          Validators.required
        ),
        file: new FormControl<File | undefined | null>(null),
        lat: new FormControl('', Validators.required),
        lan: new FormControl('', Validators.required),
      })
    );
  }

  // status
  onSelectStatusFile(info: File[], formC: FormControl) {
    formC.patchValue(info[0]);
    formC.updateValueAndValidity({ onlySelf: true });
  }

  get statusFileData() {
    return this.companyForm.controls.status_file;
  }
  removeStatusFile(index: number): void {
    this.statusFileData.removeAt(index);
  }

  addStatusFile(): void {
    this.statusFileData.push(
      new FormGroup({
        approve_number: new FormControl('', Validators.required),
        from: new FormControl<string | undefined | null>(
          '',
          Validators.required
        ),
        to: new FormControl<string | undefined | null>('', Validators.required),
        status_file: new FormControl<File | undefined | null>(null),
      })
    );
  }

  // ========================
  initFormWithRequiredData() {
    this.getGovList();
  }

  gettingGovList = false;
  govList: Country[];
  getGovList() {
    this.gettingGovList = true;
    this.utilApiService.getGovList().subscribe({
      next: (res) => {
        this.govList = res['data'];
        this.getCompanyTypes();
        this.gettingGovList = false;
      },
      error: () => {
        this.getCompanyTypes();
        this.gettingGovList = false;
      },
    });
  }

  gettingCompanyTypes = false;
  companyTypesList: CompanyType[];
  getCompanyTypes() {
    this.gettingCompanyTypes = true;
    this.utilApiService.getCompanyTypes().subscribe({
      next: (res) => {
        this.companyTypesList = res['company_types'];
        this.gettingCompanyTypes = false;
      },
      error: () => {
        this.gettingCompanyTypes = false;
      },
    });
  }

  gettingActivityTypes = false;
  activityTypesList: ActivityType[];
  getActivityTypes(id) {
    this.gettingActivityTypes = true;
    this.utilApiService.getActivityTypes(id).subscribe((response) => {
      this.gettingActivityTypes = false;
      this.activityTypesList = response['data'];
    });
  }

  loading = false;
  onSubmit() {
    // stop here if form is invalid
    if (this.companyForm.invalid) {
      Object.values(this.companyForm.controls).forEach((control) => {
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
      this.registerCompanyService
        .registerCompany(this.companyForm.value)
        .subscribe(
          (response) => {
            this.loading = false;
            const company = response['company'];
            localStorage.setItem('ifCompany','true')
            this.request.ifCompany.next(true)
            console.log('companyId from response', company);
            this.translationService.toastrTranslation(
              'success',
              response['message']
            );

            // Navigate with state
            this.router.navigate(['/main/login/validateCompany'], {
              state: { company: company },
            });
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

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
