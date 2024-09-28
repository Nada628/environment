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
import { UsersApiService } from '@shared/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
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
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  roles: any[] = [];
  departments: any[] = [];
  Userid!: number;

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
      roleName: ['', Validators.required],
    });

    // Fetch roles and departments
    this.fetchRoles();
    this.fetchDepartments();

    // Get the user ID from the route
    const idParam = this.route.snapshot.paramMap.get('id');
    this.Userid = idParam !== null ? Number(idParam) : null;

    if (this.Userid) {
      this.loadUser(this.Userid);
    }
  }
  loadUser(id: number) {
    this.usersService.getUserById(id).subscribe(
      (response) => {
        console.log('User data received from API:', response);
        
        const UserData = response.user;
  
        // Pre-fill the form with the fetched user data
        if (UserData) {
          this.formGroup.patchValue({
            name: UserData.name || '',
            email: UserData.email || '',
            username: UserData.username || '',
            password: '', // Assume password is not pre-filled for security reasons
            confirmPassword: '', // Assume confirmPassword is not pre-filled for security reasons
            departmentName: UserData.department_name || '', // Correctly set departmentName
            roleName: UserData.roles.length > 0 ? UserData.roles[0].name : '', // Access first role name
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed to load user data', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching user data:', error);
      }
    );
  }
  

  fetchRoles() {
    this.usersService.getRoles().subscribe(
      (response: any) => {
        console.log('Roles data received:', response);
        this.roles = response.data;
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  fetchDepartments() {
    this.usersService.getDepartments().subscribe(
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
        name: formValue.name,
        email: formValue.email,
        username: formValue.username,
        password: formValue.password,
        department_id: this.getDepartmentIdByName(formValue.departmentName),
        role_id: this.getRoleIdByName(formValue.roleName),
      };

      this.usersService.updateUsers(this.Userid, formData).subscribe(
        () => {
          this.snackBar.open('User updated successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['operations/Users']);
        },
        (error) => {
          this.snackBar.open('Failed to update user. Please try again.', 'Close', {
            duration: 3000,
          });
          console.error('Error updating user:', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['operations/Users']);
  }

  onDelete() {
    if (this.Userid) {
      this.usersService.deleteUser(this.Userid).subscribe(
        () => {
          this.snackBar.open('User deleted successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['operations/Users']);
        },
        (error) => {
          this.snackBar.open('Failed to delete user', 'Close', {
            duration: 3000,
          });
          console.error('Error deleting user:', error);
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
