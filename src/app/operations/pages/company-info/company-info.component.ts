import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from 'app/language/translation.service';
import { BtnComponent } from '@shared/components/buttons/btn/btn.component';
import { SelectDropdownComponent } from '@shared/components/select-dropdown/select-dropdown.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IsRequiredPipe } from '@shared/pipes/is-required.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ActivityType } from '@shared/model/activity-type';
import { CompanyType } from '@shared/model/company-type';
import { Country } from '@shared/model/gov-response';
import { RegisterCompanyService } from '@login/services/company-registeration/register-company.service';
import { UtilitiesApiService } from '@shared/services/utilities.api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyApiService } from '@shared/services/company.api.service';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [
    CommonModule,
    SubtitleComponent,
    DynamicFormComponent,
    TranslateModule,
    BtnComponent,
    SelectDropdownComponent,
    ReactiveFormsModule,
    SharedModule,
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
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss',
})
export class CompanyInfoComponent {
  subscription: Subscription;
  companiesList;
  compValue;

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
        date: FormControl<string | undefined | null>;
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
    private companyApiService: CompanyApiService,
    private auth: AuthService
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
        date: new FormControl<string | undefined | null>(
          '',
          Validators.required
        ),
        file: new FormControl<File | undefined | null>(null),
        lat: new FormControl('', Validators.required),
        lan: new FormControl('', Validators.required),
      })
    );
  }

  populateEnvironmentalApprovalData(dataArray: any[]) {
    this.environmentalApprovalData.clear(); // Clear any existing form groups
    dataArray?.forEach((data) => {
      this.environmentalApprovalData.push(
        new FormGroup({
          environmental_approval_num: new FormControl<
            string | undefined | null
          >(data.environmental_approval_num || ''),
          date: new FormControl<string | undefined | null>(data.date || ''),
          file: new FormControl<File | undefined | null>(data.file || null),
          lat: new FormControl<string | undefined | null>(data.lat || ''),
          lan: new FormControl<string | undefined | null>(data.lan || ''),
        })
      );
    });
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

  populateStatusFileData(dataArray: any[]) {
    this.statusFileData.clear(); // Clear any existing form groups
    dataArray?.forEach((data) => {
      this.statusFileData.push(
        new FormGroup({
          approve_number: new FormControl<string | undefined | null>(
            data.approve_number || ''
          ),
          from: new FormControl<string | undefined | null>(data.from || ''),
          to: new FormControl<string | undefined | null>(data.to || ''),
          status_file: new FormControl<File | undefined | null>(
            data.file || null
          ),
        })
      );
    });
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
        this.getOwnerCompaniesArr();
        this.gettingGovList = false;
      },
      error: () => {
        this.getOwnerCompaniesArr();
        this.gettingGovList = false;
      },
    });
  }

  gettingCompanies: boolean = false;
  ownerCompanies;
  getOwnerCompaniesArr() {
    this.gettingCompanies = true;
    this.companyApiService
      .getCompanyByOwnerId(this.auth.userId)
      .subscribe((res) => {
        this.gettingCompanies = false;
        this.ownerCompanies = res['companies'];
        this.getCompanyTypes();
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
        .editCompany(this.compValue, this.companyForm.value)
        .subscribe(
          (response) => {
            this.loading = false;
            const company = response['company'];
            console.log('companyId from response', company);
            this.translationService.toastrTranslation(
              'success',
              response['message']
            );

            this.compValue = '';
            this.companyForm.reset();
            // this.router.navigate(['/main/operations']);
          },
          (error) => {
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

  // getCompanyById(id) {
  //   this.registerCompanyService.getCompanyById(id).subscribe((res) => {
  //     this.companyForm.patchValue(res['company']);
  //   });
  // }

  getCompanyById(id) {
    this.registerCompanyService.getCompanyById(id).subscribe((res) => {
      const companyActivityId = Number(res['data']['activity_id']);

      this.gettingActivityTypes = true;
      this.utilApiService
        .getActivityTypes(res['data']['company_type_id'])
        .subscribe((response) => {
          this.gettingActivityTypes = false;
          this.activityTypesList = response['data'];

          const selectedActivity = this.activityTypesList.find(
            (activity) => activity.id === companyActivityId
          );

          this.populateEnvironmentalApprovalData(
            res['data']['environmental_approval_data']
          );
          this.populateStatusFileData(res['data']['status_file']);
          this.companyForm.patchValue({
            name: res['data']['name'],
            company_type_id: res['data']['company_type_id'],
            activity_id: selectedActivity ? selectedActivity.id : null,
            address: res['data']['address'],
            phone: res['data']['phone'],
            email: res['data']['email'],
            city_id: res['data']['city_id'],
            code: res['data']['code'],
            // environmental_approval_data:
            //   res['data']['environmental_approval_data'],
            industrial_registration_file:
              res['data']['industrial_registration_file'],
            industrial_registration_from:
              res['data']['industrial_registration_from'],
            industrial_registration_number:
              res['data']['industrial_registration_number'],
            industrial_registration_to:
              res['data']['industrial_registration_to'],
            manager_name: res['data']['manager_name'],
            purpose_of_use: res['data']['purpose_of_use'],
            quota: res['data']['quota'],
            quota_from: res['data']['quota_from'],
            quota_to: res['data']['quota_to'],
            // status_file: res['data']['status_file'],
          });
        });
    });
  }

  onSelectCompany(e) {
    this.getCompanyById(e);
  }
}
