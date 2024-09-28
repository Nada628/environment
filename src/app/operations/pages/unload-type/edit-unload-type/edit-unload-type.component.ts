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
import { UnLoadTypeApiService } from '@shared/services/unload-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-unload-type',
  templateUrl: './edit-unload-type.component.html',
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
  styleUrls: ['./edit-unload-type.component.scss'],
})
export class EditUnLoadTypeComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  unloadId!: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private unloadTypeService: UnLoadTypeApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      unloadType: ['', Validators.required],  
      notes: ['', Validators.required],       
      price: ['', Validators.required],       
      form_type: ['', Validators.required],   
    });
  
    // Get the ID from the route
    const idParam = this.route.snapshot.paramMap.get('id');
    this.unloadId = idParam !== null ? Number(idParam) : null;
  
    if (this.unloadId) {
      this.loadUnload(this.unloadId);
    }
  }
  

  loadUnload(id: number) {
    this.unloadTypeService.getoneById(id).subscribe(
      (response) => {
        console.log('unloadType data received from API:', response);
        
        const data = response.data;
  
        // Pre-fill the form 
        if (data) {
          this.formGroup.patchValue({
            unloadType: data.name || '',  
            notes: data.desc || '',      
            price: data.price || '',      
            form_type: data.form_type || '',          
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed to load unloadType data', 'Close', { duration: 3000 });
        console.error('Error fetching unloadType data:', error);
      }
    );
  }
  

  onUpdate() {
    this.submitted = true;
  
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
  
      const formData = {
        id: this.unloadId,
        name: formValue.unloadType, 
        desc: formValue.notes,     
        price: formValue.price,      
        form_type: formValue.form_type, 
      };
  
      this.unloadTypeService.update(formData).subscribe(
        () => {
          this.snackBar.open('Unload type updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['operations/unloadType']);
        },
        (error) => {
          this.snackBar.open('Failed to update unload type. Please try again.', 'Close', { duration: 3000 });
          console.error('Error updating unload type:', error);
        }
      );
    }
  }
  

  onCancel() {
    this.router.navigate(['operations/unloadType']);
  }

  onDelete() {
    if (this.unloadId) {
      this.unloadTypeService.delete(this.unloadId).subscribe(
        () => {
          this.snackBar.open('unloadType deleted successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['operations/unloadType']);
        },
        (error) => {
          this.snackBar.open('Failed to delete unloadType', 'Close', {
            duration: 3000,
          });
          console.error('Error deleting unloadType:', error);
        }
      );
    }
  }
}
