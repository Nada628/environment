import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AttachedDocumentsComponent } from '@operations/components/attached-documents/attached-documents.component';
import { DigitalSealingFormComponent } from '@operations/components/digital-sealing-form/digital-sealing-form.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { DropdownType } from '@operations/enums/dropdown-type.enum';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';

@Component({
  selector: 'app-trasport-companies',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ReactiveFormsModule,
    BtnDropdownComponent,
    DynamicFormComponent,
    AttachedDocumentsComponent,
    DigitalSealingFormComponent,
    SubmitButtonComponent,
    SubtitleComponent,
    ReviewerFormComponent,
  ],
  templateUrl: './trasport-companies.component.html',
  styleUrl: './trasport-companies.component.scss',
})
export class TrasportCompaniesComponent {
  ///
  currentLang: string = '';
  lang: string = '';
  form: FormGroup;
  page = 1;
  dropDownList = [
    {
      type: DropdownType.reportYear,
      name: 'customer.companyInfo',
    },
    {
      type: DropdownType.reportYear,
      name: 'customer.customerRequests',
    },
    {
      type: DropdownType.reportYear,
      name: 'customer.changePassword',
    },
    {
      type: DropdownType.reportYear,
      name: 'routingHeader.company',
    },
  ];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      area: [],
    });
  }

  getDropDownItem(event) {
    console.log(event);
  }

  //
}
