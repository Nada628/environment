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
import { UnLoadTypeApiService } from '@shared/services/unload-type.service';
@Component({
  selector: 'app-add-unload-type',
  templateUrl: './add-unload-type.component.html',
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
  styleUrls: ['./add-unload-type.component.scss'],
})
export class AddUnLoadTypeComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private unloadTypeService: UnLoadTypeApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      unloadType: ['', Validators.required],  
      notes: ['', Validators.required],       
      price: ['', Validators.required],       
      form_type: ['', Validators.required],   
    });
  }
  
  onSubmit() {
    this.submitted = true;
    this.formGroup.markAllAsTouched(); 
  
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
  
      const formData = {
        name: formValue.unloadType,   
        desc: formValue.notes,  
        price: formValue.price,
        form_type: formValue.form_type,
      };
  
      console.log('Form data to be submitted:', formData); // Debugging line
  
      this.unloadTypeService.add(formData).subscribe(
        () => {
          this.snackBar.open('Unload type added successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['operations/unloadType']);
        },
        (error) => {
          this.snackBar.open('Failed to add unload type. Please try again.', 'Close', { duration: 3000 });
          console.error('Error adding unload type:', error);
        }
      );
    }
  }
  
  



}
