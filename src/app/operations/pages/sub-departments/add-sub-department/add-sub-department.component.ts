import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SubtitleComponent } from '../../../../shared/components/subtitle/subtitle.component';
import { FilterComponent } from '../../../components/filter/filter.component';
import { SearchComponent } from '../../../components/search/search.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { SharedModule } from '@shared/shared.module';
import { DepartmentsApiService } from '@shared/services/departments.service';
import { SubDepartmentsApiService } from '@shared/services/sub-departments.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-sub-department',
  standalone: true,
  imports: [
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
  templateUrl: './add-sub-department.component.html',
  styleUrls: ['./add-sub-department.component.scss'],
})
export class AddSubDepartmentComponent implements OnInit {
  SubDepartmentId: number | null = null;
  departments: any[] = []; 
  formGroup!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentsApiService,
    private subDepartmentService: SubDepartmentsApiService,
    private router: Router,
    private route: ActivatedRoute ,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      mainDepartment: ['', Validators.required], // Store department ID
    });
  
    // Fetch departments for the dropdown
    this.departmentService.getDepartments().subscribe(
      (response) => {
        console.log('Fetched departments:', response); // Log the response
        this.departments = response.data; // Access the departments array from the data property
      },
      (error) => {
        console.error('Error fetching departments:', error); // Log any errors
      }
    );
  
    const idParam = this.route.snapshot.paramMap.get('id');
    this.SubDepartmentId = idParam !== null ? Number(idParam) : null;
  }
  
  

  onSubmit() {
    this.formGroup.markAllAsTouched(); 
    
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
  
      const formData = {
        name: formValue.name,  
        description: formValue.description,
        department_id: formValue.mainDepartment, 
    
      };
  
      this.subDepartmentService.addSubDepartment(formData).subscribe(
        () => {
          this.snackBar.open('Sub Department added successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['operations/SubDepartments']);
        },
        (error) => {
          this.snackBar.open('Failed to add Sub Department. Please try again.', 'Close', { duration: 3000 });
          console.error('Error adding Sub Department:', error);
        }
      );
    }
  }
  
  
  
}