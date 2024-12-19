import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SubtitleComponent } from '../../../../shared/components/subtitle/subtitle.component';
import { FilterComponent } from '../../../components/filter/filter.component';
import { SearchComponent } from '../../../components/search/search.component';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { SharedModule } from '@shared/shared.module';
import { Router, ActivatedRoute } from '@angular/router'; 
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyActivityApiService } from '@shared/services/company-activity.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-company-activity',
  templateUrl: './add-company-activity.component.html',
  standalone: true,
  imports: [
    TranslateModule, 
    MatSnackBarModule,
    CommonModule,
    SharedModule,
    SubtitleComponent,
    SearchBarComponent,
    DynamicFormComponent,
    SubmitButtonComponent,
    ReactiveFormsModule,
    DynamicTableComponent,
    BtnDropdownComponent,
    FilterComponent,
    SearchComponent,
  ],
  styleUrls: ['./add-company-activity.component.scss'],
})
export class AddCompanyActivityComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  companyTypes: any[] = []; 




  constructor(
    private fb: FormBuilder,
    private companyActivityService: CompanyActivityApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      activity: ['', Validators.required],
      desc: ['', Validators.required],
      company_type_id: ['', Validators.required], 
      rdf: ['', Validators.required],
    });

    this.getCompanyTypes();
  }
  getCompanyTypes() {
    this.companyActivityService.getAllCompanyType().subscribe(
      (response) => {
        console.log('Company Types:', response.data); 
        this.companyTypes = response.data; 
      },
      (error) => {
        console.error('Error fetching company types:', error);
      }
    );
  }
  
  
  
  onSubmit() {
    this.submitted = true;
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    const formValue = this.formGroup.value;

    const formData = {
      name: formValue.activity,
      description: formValue.desc,
      company_type_id: formValue.company_type_id, 
      rdf: formValue.rdf,
      code: "1",
      changer_id: "1",
      entity_id: "1",
    };

    this.companyActivityService.add(formData).subscribe(
      (response) => {
        this.toast.success('تم إضافة نشاط شركة بمجاح');
        this.router.navigate(['operations/CompanyActivity']);
      },
      (error) => {
        this.toast.error('خطأ اثناء إضافة نشاط شركة حاول مرة أخرى');
        console.error('Error adding company activity:', error);
      }
    );
  }
}
  
