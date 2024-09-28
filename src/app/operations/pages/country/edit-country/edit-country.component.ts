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
import { CountryApiService } from '@shared/services/country.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
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
  styleUrls: ['./edit-country.component.scss'],
})
export class EditCountryComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  countryId!: number;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      country: ['', Validators.required], 
      notes: ['', Validators.required], 
    });
    

  
    // Get the country ID from the route
    const idParam = this.route.snapshot.paramMap.get('id');
    this.countryId = idParam !== null ? Number(idParam) : null;
  
    if (this.countryId) {
      this.loadCountry(this.countryId);
    }
  }
  


  loadCountry(id: number) {
    this.countryService.getCountryById(id).subscribe(
      (response) => {
        console.log('country data received from API:', response);
        
        const data = response.country;
  
        // Pre-fill the form with the fetched country data
        if (data) {
          this.formGroup.patchValue({
            country: data.name || '',  // Use 'country' here
            notes: data.description || '',       
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed to load country data', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching country data:', error);
      }
    );
  }
  
  


  onUpdate() {
    this.submitted = true;
  
    if (this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
  
      const formValue = this.formGroup.value;
      
      const formData = {
        id: this.countryId, 
        name: formValue.country,
        description: formValue.notes, 
        entity_id: "1", //static
      };
  
      this.countryService.updateCountry(formData).subscribe(
        () => {
          this.snackBar.open('Country updated successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['operations/Country']);
        },
        (error) => {
          this.snackBar.open('Failed to update Country. Please try again.', 'Close', {
            duration: 3000,
          });
          console.error('Error updating Country:', error);
        }
      );
    }
  }
  

  onCancel() {
    this.router.navigate(['operations/Country']);
  }

  onDelete() {
    if (this.countryId) {
      this.countryService.deleteCountry(this.countryId).subscribe(
        () => {
          this.snackBar.open('Country deleted successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['operations/Country']);
        },
        (error) => {
          this.snackBar.open('Failed to delete Country', 'Close', {
            duration: 3000,
          });
          console.error('Error deleting Country:', error);
        }
      );
    }
  }
}
