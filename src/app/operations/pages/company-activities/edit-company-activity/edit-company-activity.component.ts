import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SubtitleComponent } from '../../../../shared/components/subtitle/subtitle.component';
import { FilterComponent } from '../../../components/filter/filter.component';
import { SearchComponent } from '../../../components/search/search.component';
import { TranslateModule } from '@ngx-translate/core';
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
  selector: 'app-edit-company-activity',
  templateUrl: './edit-company-activity.component.html',
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
    BtnDropdownComponent,
    FilterComponent,
    SearchComponent,
  ],
  styleUrls: ['./edit-company-activity.component.scss'],
})
export class EditCompanyActivityComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  activityId!: number;
  companyTypes: any[] = [];  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private companyActivityService: CompanyActivityApiService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      activity: ['', Validators.required],  
      desc: ['', Validators.required],       
      company_type_id: ['', Validators.required],       
      rdf: ['', Validators.required],   
    });
  
    this.companyActivityService.getAllCompanyType().subscribe((response) => {
      this.companyTypes = response.data || [];  
      console.log('Company Types:', this.companyTypes); 
    });
    
  
    const idParam = this.route.snapshot.paramMap.get('id');
    this.activityId = idParam !== null ? Number(idParam) : null;
  
    if (this.activityId) {
      this.loadData(this.activityId);
    }
  }
  
  
  fetchCompanyTypes() {
    this.companyActivityService.getAllCompanyType().subscribe(
      (response) => {
        this.companyTypes = response.data || [];
      },
      (error) => {
        console.error('Error fetching company types:', error);
      }
    );
  }

  loadData(id: number) {
    this.companyActivityService.getoneById(id).subscribe(
      (response) => {
        console.log('company activity data received from API:', response);
        
        const data = response.company_activity;  
  
        if (data) {
          this.formGroup.patchValue({
            activity: data.name || '', 
            desc: data.description || '',  
            company_type_id: data.company_type_id || '',  
            rdf: data.rdf !== null ? data.rdf.toString() : ''  
          });
        }
      },
      (error) => {
        console.error('Error fetching company activity data:', error);
      }
    );
  }
  
  onUpdate() {
    this.submitted = true;
  
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
  
      const formData = {
        id: this.activityId,
        name: formValue.activity,  
        desc: formValue.desc,     
        company_type_id: formValue.company_type_id,  
        rdf: formValue.rdf,   
        code: "1",       
        changer_id: "1", 
        entity_id: "1",   
      };
  
      this.companyActivityService.update(formData).subscribe(
        () => {
          this.toast.success('تم تعديل نشاط الشركة بنجاح');
          this.router.navigate(['operations/CompanyActivity']);
        },
        (error) => {
          this.toast.error('خطأ اثناء تعديل نشاط الشركة حاول مرة أخرى');
          console.error('Error updating company activity:', error);
        }
      );
    }
  }

  onDelete() {
    if (this.activityId) {
      this.companyActivityService.delete(this.activityId).subscribe(
        () => {
          this.toast.success('تم حذف نشاط الشركة بنجاح');

          this.router.navigate(['operations/CompanyActivity']);
        },
        (error) => {
          this.toast.error('خطأ اثناء حذف نشاط الشركة حاول مرة أخرى');

          console.error('Error deleting company activity:', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['operations/CompanyActivity']);
  }
}
