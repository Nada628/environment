import { FormBuilder, FormGroup, ReactiveFormsModule,FormArray, Validators } from '@angular/forms';
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
import { RolesApiService } from '@shared/services/roles.service';
import { Router, ActivatedRoute } from '@angular/router'; // Import Router for navigation
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IsRequiredPipe } from '@shared/pipes/is-required.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
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
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {
  departmentId: number | null = null;
  formGroup!: FormGroup;
  submitted = false;
  permissions: any[] = []; // To store fetched permissions


  constructor(
    private fb: FormBuilder,
    private rolesService: RolesApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      role: ['', Validators.required],
      permissions: this.fb.array([]), // Initialize the FormArray
    });
  
    this.getAllPermissions(); // Fetch permissions and set up the FormArray
  }
  

  getAllPermissions() {
    this.rolesService.getAllPermissions().subscribe(response => {
      if (response.success) {
        this.permissions = response.data;
        console.log('Permissions fetched:', this.permissions);
  
        const permissionsFormArray = this.formGroup.get('permissions') as FormArray;
        // Clear existing controls (in case this method is called multiple times)
        permissionsFormArray.clear();
        this.permissions.forEach(() => permissionsFormArray.push(this.fb.control(false)));
      }
    });
  }
  

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
  
      // Map the selected permissions to their IDs
      const selectedPermissions = formValue.permissions
        .map((checked: boolean, index: number) => (checked ? this.permissions[index].id : null))
        .filter((id: number | null) => id !== null); // Filter out null values
  
      // Prepare the form data
      const formData = {
        name: formValue.role,
        permissions: selectedPermissions, // Set permissions as an array of IDs
      };
  
      // Call the add method on your roles service
      this.rolesService.add(formData).subscribe(
        () => {
          this.snackBar.open('Role added successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['operations/Roles']);
        },
        (error) => {
          this.snackBar.open('Failed to add Role. Please try again.', 'Close', { duration: 3000 });
          console.error('Error adding Role:', error);
        }
      );
    }
  }
  
}
