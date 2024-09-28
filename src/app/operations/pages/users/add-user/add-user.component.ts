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
import { UsersApiService } from '@shared/services/users.service';
import { Router, ActivatedRoute } from '@angular/router'; // Import Router for navigation
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
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
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  departmentId: number | null = null;
  formGroup!: FormGroup;
  submitted = false;
  roles: any[] = []; // To store roles fetched from API
  departments: any[] = []; // To store departments fetched from API

  constructor(
    private fb: FormBuilder,
    private usersService: UsersApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      departmentName: ['', Validators.required],
      roleName: ['', Validators.required]
    });

    // Fetch roles and departments if needed
    this.fetchRoles();
    this.fetchDepartments();

    const idParam = this.route.snapshot.paramMap.get('id');
    this.departmentId = idParam !== null ? Number(idParam) : null;
  }

  fetchRoles() {
    this.usersService.getRoles().subscribe(
      (response: any) => {
        this.roles = response.data; // Assuming `data` is the key containing the roles
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  fetchDepartments() {
    this.usersService.getDepartments().subscribe(
      (response: any) => {
        this.departments = response.data; // Assuming `data` is the key containing the departments
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  onSubmit() {
    this.submitted = true; // Set submitted flag to true before validation
    if (this.formGroup.valid) {
      this.formGroup.markAllAsTouched(); // Mark all controls as touched to show validation errors
      const formValue = this.formGroup.value;
      const formData = {
        name: formValue.name,
        email: formValue.email,
        username: formValue.username,
        password: formValue.password,
        department_id: this.getDepartmentIdByName(formValue.departmentName),
        role_id: this.getRoleIdByName(formValue.roleName),
      };

      this.usersService.addUser(formData).subscribe(
        () => {
          this.snackBar.open('User added successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['operations/Users']);
        },
        (error) => {
          this.snackBar.open('Failed to add user. Please try again.', 'Close', {
            duration: 3000,
          });
          console.error('Error adding user:', error);
        }
      );
    }
  }
  getDepartmentIdByName(name: string): number | null {
    const department = this.departments.find(d => d.name === name);
    return department ? department.id : null;
  }

  getRoleIdByName(name: string): number | null {
    const role = this.roles.find(r => r.name === name);
    return role ? role.id : null;
  }
}
