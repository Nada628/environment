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
import { ServiceApiService } from '@shared/services/services.service';
import {DepartmentsApiService} from'@shared/services/departments.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
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
  styleUrls: ['./add-service.component.scss'],
})
export class AddServiceComponent implements OnInit {
  departmentId: number | null = null;
  formGroup!: FormGroup;
  submitted = false;
  departments: any[] = []; // To store departments fetched from API

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceApiService,
    private departmentService: DepartmentsApiService, 
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}


  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      department_id: [null, Validators.required], 
      desc: ['', Validators.required],
    });

    this.fetchDepartments();
  }

  fetchDepartments() {
    this.departmentService.getDepartments().subscribe(
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
      const formData = {
        name: this.formGroup.value.name,
        department_id: this.formGroup.value.department_id, // Send department_id
        desc: this.formGroup.value.desc,
      };

      // Submit the form data to the API
      this.serviceService.add(formData).subscribe(
        () => {
          this.snackBar.open('Service added successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['operations/Services']);
        },
        (error) => {
          this.snackBar.open('Failed to add service. Please try again.', 'Close', {
            duration: 3000,
          });
          console.error('Error adding service:', error);
        }
      );
    }
  }
}
 

