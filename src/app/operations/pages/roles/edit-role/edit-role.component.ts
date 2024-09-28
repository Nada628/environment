import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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
import { Router, ActivatedRoute } from '@angular/router'; 
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
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
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
  styleUrls: ['./edit-role.component.scss'],
})
export class EditRoleComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  permissions: any[] = []; // To store fetched permissions
  roleId: string | null = null; // To store the role ID

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

    this.roleId = this.route.snapshot.paramMap.get('id'); // Get the role ID from route parameters

    this.getAllPermissions(); // Fetch permissions
    if (this.roleId) {
      this.fetchRoleData(this.roleId); // Fetch and pre-fill role data
    }
  }

  getAllPermissions() {
    this.rolesService.getAllPermissions().subscribe(response => {
      if (response.success) {
        this.permissions = response.data;
        const permissionsFormArray = this.formGroup.get('permissions') as FormArray;
        permissionsFormArray.clear();
        this.permissions.forEach(() => permissionsFormArray.push(this.fb.control(false)));
      }
    });
  }
  fetchRoleData(id: string) {
    this.rolesService.getoneById(+id).subscribe(response => {
      if (response.success) {
        const roleData = response.data;
  
        // Pre-fill the role name
        this.formGroup.patchValue({
          role: roleData.name,
        });
  
        // Get the permissions FormArray
        const permissionsFormArray = this.formGroup.get('permissions') as FormArray;
  
        // Log permissions for debugging
        console.log('Fetched Role Data:', roleData);
        console.log('Available Permissions:', this.permissions);
  
        // Create a set of permission IDs for quick lookup
        const rolePermissionIds = new Set(roleData.permissions.map((perm: { id: number }) => perm.id));
  
        // Loop through the permissions and set the checkboxes
        this.permissions.forEach((perm, index) => {
          const hasPermission = rolePermissionIds.has(perm.id); // Check if the current permission ID exists in the role's permissions
          permissionsFormArray.at(index).setValue(hasPermission); // Set true or false based on role permissions
        });
      } else {
        this.snackBar.open('Failed to load role data. Please try again.', 'Close', { duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Error fetching role data. Please try again.', 'Close', { duration: 3000 });
      console.error('Error fetching role data:', error);
    });
  }
  
  

  onUpdate() {
    this.submitted = true;
    if (this.formGroup.valid && this.roleId) {
      const formValue = this.formGroup.value;
      const selectedPermissions = formValue.permissions
        .map((checked: boolean, index: number) => (checked ? this.permissions[index].id : null))
        .filter((id: number | null) => id !== null);

      const formData = {
        id: this.roleId, // Include the role ID
        name: formValue.role,
        permissions: selectedPermissions,
      };

      this.rolesService.update(formData).subscribe(
        () => {
          this.snackBar.open('Role updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['operations/Roles']);
        },
        (error) => {
          this.snackBar.open('Failed to update Role. Please try again.', 'Close', { duration: 3000 });
          console.error('Error updating Role:', error);
        }
      );
    }
  }
  onCancel() {
    this.router.navigate(['operations/Roles']);
  }

  onDelete() {
    if (this.roleId) {
      const roleIdNumber = +this.roleId; // Convert string to number
      this.rolesService.delete(roleIdNumber).subscribe(
        () => {
          this.snackBar.open('Role deleted successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['operations/Roles']);
        },
        (error) => {
          this.snackBar.open('Failed to delete Role. Please try again.', 'Close', { duration: 3000 });
          console.error('Error deleting Role:', error);
        }
      );
    } else {
      this.snackBar.open('Role ID is missing.', 'Close', { duration: 3000 });
    }
  }
  
  

 
}


