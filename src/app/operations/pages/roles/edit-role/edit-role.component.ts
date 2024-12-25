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
import { ToastrService } from 'ngx-toastr';

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
  permissions: any[] = []; 
  roleId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      role: ['', Validators.required],
      desc:['', Validators.required],
      permissions: this.fb.array([]), 
    });

    this.roleId = this.route.snapshot.paramMap.get('id'); 

    this.getAllPermissions(); 
    if (this.roleId) {
      this.fetchRoleData(this.roleId); 
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
  
        this.formGroup.patchValue({
          role: roleData.name,
          desc: roleData.desc,
        });
  
        const permissionsFormArray = this.formGroup.get('permissions') as FormArray;
  
        console.log('Fetched Role Data:', roleData);
        console.log('Available Permissions:', this.permissions);
  
        const rolePermissionIds = new Set(roleData.permissions.map((perm: { id: number }) => perm.id));
  
        this.permissions.forEach((perm, index) => {
          const hasPermission = rolePermissionIds.has(perm.id); 
          permissionsFormArray.at(index).setValue(hasPermission); 
        });
      } else {
        this.toastr.error('Failed to load role data. Please try again.');
      }
    }, error => {
      this.toastr.error('Error fetching role data. Please try again.');
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
        id: this.roleId, 
        name: formValue.role,
        desc: formValue.desc,
        permissions: selectedPermissions,
      };

      this.rolesService.update(formData).subscribe(
        () => {
          this.toastr.success('تم تعديل الصلاحية بنجاح');
          this.router.navigate(['operations/Roles']);
        },
        (error) => {
          this.toastr.error('خطأ في تعديل الصلاحية');
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
      const roleIdNumber = +this.roleId; 
      this.rolesService.delete(roleIdNumber).subscribe(
        () => {
          this.toastr.success('تم حذف الصلاحية بنجاح');
          this.router.navigate(['operations/Roles']);
        },
        (error) => {
          this.toastr.error('خطأ في حذف الصلاحية');
          console.error('Error deleting Role:', error);
        }
      );
    } else {
      // this.snackBar.open('Role ID is missing.', 'Close', { duration: 3000 });
    }
  }
  
  

 
}


