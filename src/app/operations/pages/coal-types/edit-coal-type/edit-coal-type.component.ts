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
import { CoalTypesApiService } from '@shared/services/coal-types.service.';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubDepartmentsApiService } from '@shared/services/sub-departments.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-coal-type',
  templateUrl: './edit-coal-type.component.html',
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
  styleUrls: ['./edit-coal-type.component.scss'],
})
export class EditCoalTypeComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  roles: any[] = [];
  departments: any[] = [];
  subdepartments: any[] = [];
  coalId!: number;

  constructor(
    private fb: FormBuilder,
    private coalTypesService: CoalTypesApiService,
    private subDepartmentsService: SubDepartmentsApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      Code: ['', [Validators.required,]],
      ratioPrice: ['', Validators.required],
      departmentName: ['', Validators.required],
      subdepartmentName: ['', Validators.required],
      Percentage: ['', Validators.required],
    });

    // Fetch departments and sub-departments
    this.fetchDepartments();
    this.fetchSubDepartments();

   

    // Get the Coal ID from the route
    const idParam = this.route.snapshot.paramMap.get('id');
    this.coalId = idParam !== null ? Number(idParam) : null;

    if (this.coalId) {
      this.loadCoal(this.coalId);
    }
  }
  loadCoal(id: number) {
    this.coalTypesService.getCoalTypeById(id).subscribe(
      (response) => {
        console.log('User data received from API:', response);
        
        const data = response.data;
  
        // Pre-fill the form with the fetched user data
        if (data) {
          this.formGroup.patchValue({
            name: data.name || '',
            Code: data.code || '',
            ratioPrice: data.ratio_price_per_ton || '',
            departmentName: data.department_name || '', 
            subdepartmentName: data.sub_department_name || '',
            Percentage: data.hander_percent,
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed to load coal data', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching coal data:', error);
      }
    );
  }
  

  fetchDepartments() {
    this.coalTypesService.getDepartments().subscribe(
      (response: any) => {
        console.log('Departments data received:', response);
        this.departments = response.data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }
  fetchSubDepartments() {
    this.subDepartmentsService.getAll().subscribe(
      (response: any) => {
        this.subdepartments = response.data;
      },
      (error) => {
        console.error('Error fetching subdepartments:', error);
      }
    );
  }
  onUpdate() {
    this.submitted = true;
  
    if (this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
  
      const formValue = this.formGroup.value;
      
      const departmentId = this.getDepartmentIdByName(formValue.departmentName);
      const subDepartmentId = this.getSubDepartmentIdByName(formValue.subdepartmentName);
      const formData = {
        id: this.coalId,
        name: formValue.name,
        code: formValue.Code,
        ratio_price_per_ton: formValue.ratioPrice,
        department_id: departmentId, 
        sub_department_id: subDepartmentId,  
        hander_percent: formValue.Percentage,
      };
  
      this.coalTypesService.updateCoalType(formData).subscribe(
        () => {
          this.toastr.success('تم تعديل بيانات نوع الفحم بنجاح');
          this.router.navigate(['operations/coalTypes']);
        },
        (error) => {
          this.toastr.error('خطأ اثناء تعديل بيانات نوع الفحم حاول مرة أخرى');
          console.error('Error updating coal:', error);
        }
      );
    }
  }
  
  

  onCancel() {
    this.router.navigate(['operations/coalTypes']);
  }

  onDelete() {
    if (this.coalId) {
      this.coalTypesService.deleteCoalType(this.coalId).subscribe(
        () => {
          this.toastr.success('تم حذف نوع الفحم بنجاح');
          this.router.navigate(['operations/coalTypes']);
        },
        (error) => {
          this.toastr.error('خطأ اثناء حذف نوع الفحم حاول مرة أخرى');
          
          console.error('Error deleting coal:', error);
        }
      );
    }
  }

  getDepartmentIdByName(name: string): number | null {
    const department = this.departments.find(d => d.name === name);
    return department ? department.id : null; 
  }
  
  getSubDepartmentIdByName(name: string): number | null {
    const subdepartment = this.subdepartments.find(s => s.name === name);
    return subdepartment ? subdepartment.id : null;  
  }
  

}
