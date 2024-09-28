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
import { CityApiService } from '@shared/services/city.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
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
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private cityService: CityApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      city: ['', Validators.required],
      notes: ['', [Validators.required,]],
      country_id: ['', Validators.required],
    });

  }

  onSubmit() {
    this.submitted = true;
    this.formGroup.markAllAsTouched(); 
  
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
  
      const formData = {
        name: formValue.city,   
        desc: formValue.notes,  
        country_id: formValue.country_id,
      };
  
      this.cityService.addCity(formData).subscribe(
        () => {
          this.snackBar.open('City added successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['operations/City']);
        },
        (error) => {
          this.snackBar.open('Failed to add city. Please try again.', 'Close', { duration: 3000 });
          console.error('Error adding city:', error);
        }
      );
    }
  }
  



}
