import { TranslationService } from 'app/language/translation.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { DigitalSealingSubmitionComponent } from '@operations/pages/digital-sealing-submition/digital-sealing-submition.component';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CompanyValidationFormSerivce } from '@login/services/company-validation/company-validate-form.service';
import { Subscription } from 'rxjs';
import { CompanyValidationSerivce } from '@login/services/company-validation/company-validate.service';
import { CompanyValidationApiSerivce } from '@login/services/company-validation/company-validate-api.service';
import { MenuHeaderComponent } from 'app/core/layout/components/header/components/menu-header/menu-header.component';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';

@Component({
  selector: 'app-company-validation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
    SubtitleComponent,
    DigitalSealingSubmitionComponent,
    MatStepperModule,
    TranslateModule,
  ],
  templateUrl: './company-validation.component.html',
  styleUrl: './company-validation.component.scss',
})
export class CompanyValidationComponent implements OnInit {
  model;
  companySubscription: Subscription;
  submitSubscription: Subscription;
  selectedCompanyId;

  bodyData;

  constructor(
    private request: RequestSubmittedService,
    private companyValidationForm: CompanyValidationFormSerivce,
    private dialog: MatDialog,
    private router: Router,
    private companyValidationService: CompanyValidationSerivce,
    private companyValidationApiService: CompanyValidationApiSerivce,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.model = this.companyValidationForm.initForm();
  }

  onSubmit(form) {
    let formData: FormData;
    if (form.valid) {
      formData = this.companyValidationService.mapValidateCompanyData(
        form.value
      );
      this.companyValidationApiService
        .validateCompany(formData)
        .subscribe((response) => {
          this.translationService.toastrTranslation('success', response['msg']);
          this.bodyData = response['data'];
          this.openDialog();
          localStorage.setItem('activate','true')
          this.request.activate.next(true)
        }),
        (error) =>
          this.translationService.toastrTranslation(
            'error',
            'toastr.enterValidValues'
          );
    } else {
      this.translationService.toastrTranslation(
        'error',
        'toastr.enterValidValues'
      );
      form.markAllAsTouched();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      panelClass: 'custom-container',
      data: {
        row: 'row',
        option: 'digitalSealingSuccess',
        body: this.bodyData,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/operations/statistics']);
    });
  }

  
}
