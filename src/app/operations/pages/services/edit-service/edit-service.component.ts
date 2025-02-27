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
import { ServiceApiService } from '@shared/services/services.service';
import {DepartmentsApiService} from'@shared/services/departments.service';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
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
  styleUrls: ['./edit-service.component.scss'],
})
export class EditServiceComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  roles: any[] = [];
  departments: any[] = [];
  Serviceid!: number;
  requests = [
    { id: 1, name: 'اصدار خطاب الموافقة على تصدير فحم نباتي' },
    { id: 2, name: 'الموافقة على استكمال كمية شحنة مصدرة وموانئ تصدير' },
    { id: 3, name: 'خدمة طلب اعتماد نموذج انتاج فحم نباتي' },
    { id: 4, name: 'اصدار خطاب عدم ممانعة شحنات الفحم ( حجري - بترولي ) ' },
    { id: 5, name: 'اعتماد تقرير الاداء البيئي سنويا' },


  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private serviceService: ServiceApiService,
    private departmentService: DepartmentsApiService, 
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      department_id: ['', Validators.required], 
      desc: ['', Validators.required],
      cost: [, Validators.required],
      request_type: [, Validators.required]
    });

    this.fetchDepartments();

    const idParam = this.route.snapshot.paramMap.get('id');
    this.Serviceid = idParam !== null ? Number(idParam) : null;

    if (this.Serviceid) {
      this.loadService(this.Serviceid);
    }
  }
  loadService(id: number) {
    this.serviceService.getOneById(id).subscribe(
      (response) => {
        console.log('service data received from API:', response);
        
        const data = response.data;
  
        // Pre-fill the form with the fetched service data
        if (data) {
          this.formGroup.patchValue({
            name: data.title || '',
            department_id: data.department_id || '', 
            desc: data.description || '',
            cost: data.cost ,
            request_type: data.request_type ,

          });
        }
      },
      (error) => {
       
        console.error('Error fetching service data:', error);
      }
    );
  }
  

  fetchDepartments() {
    this.departmentService.getDepartments().subscribe(
      (response: any) => {
        console.log('Departments data received:', response);
        this.departments = response.data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  onUpdate() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.formGroup.markAllAsTouched();

      const formValue = this.formGroup.value;
      const formData = {
        title: formValue.name,
        department_id: formValue.department_id, 
        description: formValue.desc,
        cost: formValue.cost,
        request_type: formValue.request_type


      };

      this.serviceService.update(this.Serviceid, formData).subscribe(
        () => {
          this.toast.success('تم تعديل الخدمة بنجاح');

          this.router.navigate(['operations/Services']);
        },
        (error) => {
          this.toast.error('خطأ في تعديل الخدمة حاول مرة أخرى');

          console.error('Error updating services:', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['operations/Services']);
  }

  onDelete() {
    if (this.Serviceid) {
      this.serviceService.delete(this.Serviceid).subscribe(
        () => {
          this.toast.success('تم حذف الخدمة بنجاح');

          this.router.navigate(['operations/Services']);
        },
        (error) => {
          this.toast.error('خطأ في حذف الخدمة حاول مرة أخرى')
          console.error('Error deleting service:', error);
        }
      );
    }
  }

  getDepartmentIdByName(name: string): number | null {
    const department = this.departments.find(d => d.name === name);
    return department ? department.id : null;
  }

}
