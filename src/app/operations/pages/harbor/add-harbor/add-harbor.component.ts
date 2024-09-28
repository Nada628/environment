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
import { HarborApiService } from '@shared/services/harbor.service';
@Component({
  selector: 'app-add-harbor',
  templateUrl: './add-harbor.component.html',
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
  styleUrls: ['./add-harbor.component.scss'],
})
export class AddHarborComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  countries: any[] = []; // To store countries


  constructor(
    private fb: FormBuilder,
    private harborService: HarborApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      harbor: ['', Validators.required],  
      code: ['', Validators.required],       
      harbor_type: ['', Validators.required],       
      country_id: ['', Validators.required],   
    });

    // Fetch countries when the component initializes
    this.harborService.getCountry().subscribe(
      (res) => {
        this.countries = res['countries']; // Adjust according to the actual structure
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }
  
  onSubmit() {
    this.submitted = true;
    this.formGroup.markAllAsTouched(); 
  
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
  
      const formData = {
        name: formValue.harbor,   
        code: formValue.code,  
        harbor_type: formValue.harbor_type,
        country_id: formValue.country_id,
        changer_id: 1, //static value
        entity_id: 1,  //static value
      };
  
      console.log('Form data to be submitted:', formData); 
  
      this.harborService.add(formData).subscribe(
        () => {
          this.snackBar.open('Harbor added successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['operations/Harbors']);
        },
        (error) => {
          this.snackBar.open('Failed to add harbor. Please try again.', 'Close', { duration: 3000 });
          console.error('Error adding harbor:', error);
        }
      );
    }
  }
}