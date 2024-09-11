import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroupDirective,
  NgForm,
  FormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { TranslationService } from 'app/language/translation.service';
import { DialogService } from '@shared/services/dialog.service';
import { AdmissionFormUtilitiesService } from '@operations/services/admission-form/admission-form-utilities.service';
import { AdmissionFormModelsService } from '@operations/services/admission-form/admission-form-models.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-add-company-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIcon,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './add-company-modal.component.html',
  styleUrls: ['./add-company-modal.component.scss'],
})
export class AddCompanyModalComponent {
  companyNameControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private translationService: TranslationService,
    public dialogRef: MatDialogRef<AddCompanyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onAddCompany() {
    if (this.companyNameControl.valid) {
      // 1 - unload_company_id
      if (this.data.field.fieldName === 'unload_company_id') {
        this.dialogService
          .addUnloadCompany(this.companyNameControl.value)
          .subscribe(
            (res) => {
              this.translationService.toastrTranslation('success', res['msg']);
            },
            (err) => {
              this.translationService.toastrTranslation('error', err['msg']);
            }
          );
        this.companyNameControl.reset();
      }
      // 2 - store_company_id
      else if (this.data.field.fieldName === 'store_company_id') {
        this.dialogService
          .addStoreCompany(this.companyNameControl.value)
          .subscribe(
            (res) => {
              this.translationService.toastrTranslation('success', res['msg']);
            },
            (err) => {
              this.translationService.toastrTranslation('error', err['msg']);
            }
          );
        this.companyNameControl.reset();
      }
      // 3 - transport_company_id
      else if (this.data.field.fieldName === 'transport_company_id') {
        this.dialogService
          .addTransportCompany(this.companyNameControl.value)
          .subscribe(
            (res) => {
              this.translationService.toastrTranslation('success', res['msg']);
            },
            (err) => {
              this.translationService.toastrTranslation('error', err['msg']);
            }
          );
        this.companyNameControl.reset();
      }
      // 4 - centeral_store_company_id
      else if (this.data.field.fieldName === 'centeral_store_company_id') {
        this.dialogService
          .addCenteralStoreCompany(this.companyNameControl.value)
          .subscribe(
            (res) => {
              this.translationService.toastrTranslation('success', res['msg']);
            },
            (err) => {
              this.translationService.toastrTranslation('error', err['msg']);
            }
          );
        this.companyNameControl.reset();
      }
      // 5 - harbor_landing_river_id
      else if (this.data.field.fieldName === 'harbor_landing_river_id') {
        this.dialogService
          .addRiverCompany(this.companyNameControl.value)
          .subscribe(
            (res) => {
              this.translationService.toastrTranslation('success', res['msg']);
            },
            (err) => {
              this.translationService.toastrTranslation('error', err['msg']);
            }
          );
        this.companyNameControl.reset();
      }
    } else {
      this.translationService.toastrTranslation(
        'error',
        'toastr.enterValidValues'
      );
    }
  }

  openAddCompanyDialog() {
    const dialogRef = this.dialog.open(AddCompanyModalComponent, {
      data: { field: { fieldName: 'example' } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Result:', result);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
