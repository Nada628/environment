import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { DepartmentsApiService } from '@shared/services/departments.service';
import { SubDepartmentsApiService } from '@shared/services/sub-departments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewChild, TemplateRef } from '@angular/core';
import { SubtitleComponent } from '../../../../shared/components/subtitle/subtitle.component';
import { FilterComponent } from '../../../components/filter/filter.component';
import { SearchComponent } from '../../../components/search/search.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-sub-department',
  standalone: true,
  imports: [
    MatSnackBarModule,
    CommonModule,
    SharedModule,
    SubtitleComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    DynamicFormComponent,
    SubmitButtonComponent,
    DynamicTableComponent,
    BtnDropdownComponent,
    FilterComponent,
    SearchComponent,
  ],
  templateUrl: './edit-sub-department.component.html',
  styleUrls: ['./edit-sub-department.component.scss'],
})
export class EditSubDepartmentComponent implements OnInit {
  SubDepartmentId: number | null = null;
  departments: any[] = []; 
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private departmentService: DepartmentsApiService,
    private subDepartmentService: SubDepartmentsApiService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private toastr: ToastrService

  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      mainDepartment: ['', Validators.required], 
    });

    this.departmentService.getDepartments().subscribe(
      (response) => {
        this.departments = response.data;
      },
      (error) => {
        this.snackBar.open('Failed to load departments', 'Close', { duration: 3000 });
        console.error('Error fetching departments:', error);
      }
    );

    // Get the ID from the route
    const idParam = this.route.snapshot.paramMap.get('id');
    this.SubDepartmentId = idParam !== null ? Number(idParam) : null;

    if (this.SubDepartmentId) {
      this.loadSubDepartment(this.SubDepartmentId);
    }
  }

  loadSubDepartment(id: number) {
    this.subDepartmentService.getOneById(id).subscribe(
      (response) => {
        const data = response.data;

        if (data) {
          this.formGroup.patchValue({
            name: data.name || '',
            description: data.description || '',
            mainDepartment: data.department_id || '', 
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed to load sub department data', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching data:', error);
      }
    );
  }

  onUpdate() {
    if (this.formGroup.valid) {
      this.formGroup.markAllAsTouched();

      const formValue = this.formGroup.value;
      const formData = {
        id: this.SubDepartmentId,
        name: formValue.name, 
        description: formValue.description, 
        department_id: formValue.mainDepartment, 
      };

      this.subDepartmentService.updateSubDepartment(formData).subscribe(
        () => {
          this.toastr.success('تم تعديل القسم الفرعي بنجاح');
          this.router.navigate(['operations/SubDepartments']);
        },
        (error) => {
          this.toastr.error('حدث خطأ أثناء تعديل القسم الفرعي. حاول مرة أخرى.');
          console.error('Error updating sub department:', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['operations/SubDepartments']);
  }

  onDelete() {
    if (this.SubDepartmentId) {
      this.subDepartmentService.deleteSubDepartment(this.SubDepartmentId).subscribe(
        () => {
          this.toastr.success('تم حذف القسم الفرعي بنجاح');

          this.router.navigate(['operations/SubDepartments']);
        },
        (error) => {
          this.toastr.error('حدث خطأ أثناء حذف القسم الفرعي. حاول مرة أخرى.');

          console.error('Error deleting sub department:', error);
        }
      );
    }
  }
}