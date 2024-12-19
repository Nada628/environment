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
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-addDepartment',
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
  templateUrl: './addDepartment.component.html',
  styleUrls: ['./addDepartment.component.scss'],
})
export class AddDepartmentComponent implements OnInit {
  departmentId: number | null = null;

  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentsApiService,
    private router: Router,
    private route: ActivatedRoute,
    private message: NzMessageService
    ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    const idParam = this.route.snapshot.paramMap.get('id');
    this.departmentId = idParam !== null ? Number(idParam) : null;
    console.log(this.departmentId);

    if (this.departmentId) {
      this.loadDepartment(this.departmentId);
    }
  }
  loadDepartment(id: number) {
    console.log('Loading department with ID:', id);
  }
  onSubmit() {
    if (this.formGroup.valid) {
      const formData = {
        ...this.formGroup.value,
        id: null,
        changer_id: '1',
        entity_id: '1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      this.departmentService.addDepartment(formData).subscribe({
        next: () => {
          this.message.success('تم إضافة القسم بنجاح');
          this.router.navigate(['operations/departments']);
        },
        error: (err) => {
          this.message.error('حدث خطأ أثناء إضافة القسم. حاول مرة أخرى.');
          console.error('Error:', err);
        }
      });
    }
    }
  }
