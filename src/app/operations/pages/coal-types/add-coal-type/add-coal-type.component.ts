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
import { CoalTypesApiService } from '@shared/services/coal-types.service.';
import { Router, ActivatedRoute } from '@angular/router'; 
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubDepartmentsApiService } from '@shared/services/sub-departments.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-coal-type',
  templateUrl: './add-coal-type.component.html',
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
  styleUrls: ['./add-coal-type.component.scss'],
})
export class AddCoalTypeComponent implements OnInit {
  departmentId: number | null = null;
  formGroup!: FormGroup;
  submitted = false;
  departments: any[] = []; 
  subdepartments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private coalTypesService: CoalTypesApiService,
    private subDepartmentsService: SubDepartmentsApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      Code: ['', [Validators.required,]],
      ratioPrice: ['', Validators.required],
      departmentName: ['', Validators.required],
      Percentage: ['', Validators.required],
      subdepartmentName: ['', Validators.required]  

    });

    this.fetchDepartments();
    this.fetchSubDepartments();

    const idParam = this.route.snapshot.paramMap.get('id');
    this.departmentId = idParam !== null ? Number(idParam) : null;
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

  fetchDepartments() {
    this.coalTypesService.getDepartments().subscribe(
      (response: any) => {
        this.departments = response.data; 
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      const formValue = this.formGroup.value;
      
      const formData = {
        name: formValue.name,  
        code: formValue.Code,  
        ratio_price_per_ton: formValue.ratioPrice,  
        hander_percent: formValue.Percentage,  
        department_id: this.getDepartmentIdByName(formValue.departmentName),  
        subdepartment_id: this.getSubDepartmentIdByName(formValue.subdepartmentName), 

      };
  
      this.coalTypesService.addCoalType(formData).subscribe(
        () => {
          this.snackBar.open('Coal type added successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['operations/coalTypes']);
        },
        (error) => {
          this.snackBar.open('Failed to add coal type. Please try again.', 'Close', { duration: 3000 });
          console.error('Error adding coal type:', error);
        }
      );
    }
  }
  

  getSubDepartmentIdByName(name: string): number | null {
    const subdepartment = this.subdepartments.find(s => s.name === name);
    return subdepartment ? subdepartment.id : null;
  }
  
  getDepartmentIdByName(name: string): number | null {
    const department = this.departments.find(d => d.name === name);
    return department ? department.id : null;
  }


}
