import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { DepartmentsApiService } from '@shared/services/departments.service';
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
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-edit-department',
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
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss'],
})
export class editDepartmentComponent implements OnInit {
  departmentId: number | null = null;
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentsApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar ,
    private message: NzMessageService

  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.departmentId = idParam !== null ? Number(idParam) : null;

    if (this.departmentId) {
      this.loadDepartment(this.departmentId);
    }
  }
  loadDepartment(id: number) {
    this.departmentService.getDepartmentById(id).subscribe(
      (response) => {
        const departmentData = response.data;

        this.formGroup.patchValue({
          name: departmentData.name,
          description: departmentData.description,
        });
      },
      (error) => {
        this.snackBar.open('Failed to load department data', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching department data:', error);
      }
    );
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = {
        ...this.formGroup.value,
        id: this.departmentId, 
        changer_id: '1',
        entity_id: '1',
        updated_at: new Date().toISOString(),
      };

      this.departmentService.updateDepartment(formData).subscribe(
        () => {
          this.message.success('تم تعديل القسم بنجاح');

          this.router.navigate(['operations/departments']);
        },
        (error) => {
          this.message.error('خطأ في تعديل القسم حاول مرة أخرى');

        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['operations/departments']);
  }
  onDelete() {
    if (this.departmentId) {
      this.departmentService.deleteDepartment(this.departmentId).subscribe(
        () => {
          this.message.success('تم حذف القسم بنجاح  ');
          this.router.navigate(['operations/departments']);
        },
        (error) => {
          this.message.error('خطأ في حذف الفسم حاول مرة أخرى   ')
          }
      );
    }
  }
}
