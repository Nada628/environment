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
import { CurrencyApiService } from '@shared/services/currency.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-currency',
  templateUrl: './edit-currency.component.html',
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
  styleUrls: ['./edit-currency.component.scss'],
})
export class EditCurrencyComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  currencyId!: number;

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyApiService, // Correct spelling
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      currency: ['', Validators.required],  // Correct form controls
      code: ['', Validators.required],      // Correct form controls
    });
  
    // Get the currency ID from the route
    const idParam = this.route.snapshot.paramMap.get('id');
    this.currencyId = idParam !== null ? Number(idParam) : null;
  
    if (this.currencyId) {
      this.loadCurrency(this.currencyId);
    }
  }

  loadCurrency(id: number) {
    this.currencyService.getoneById(id).subscribe(
      (response) => {
        console.log('Currency data received from API:', response);
        
        const data = response.data;

        // Pre-fill the form with the fetched currency data
        if (data) {
          this.formGroup.patchValue({
            currency: data.name || '',  // Ensure the form control names match
            code: data.code || '',      // Ensure the form control names match
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed to load currency data', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching currency data:', error);
      }
    );
  }

  onUpdate() {
    this.submitted = true;
  
    if (this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
  
      const formValue = this.formGroup.value;
      
      const formData = {
        id: this.currencyId, 
        name: formValue.currency,  // Correct mapping
        code: formValue.code,      // Correct mapping
        entity_id: '1',            // Static value
        changer_id: '1'            // Static value
      };
  
      this.currencyService.update(formData).subscribe(
        () => {
          this.snackBar.open('Currency updated successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['operations/Currency']);
        },
        (error) => {
          this.snackBar.open('Failed to update Currency. Please try again.', 'Close', {
            duration: 3000,
          });
          console.error('Error updating Currency:', error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['operations/Currency']);
  }

  onDelete() {
    if (this.currencyId) {
      this.currencyService.delete(this.currencyId).subscribe(
        () => {
          this.snackBar.open('Currency deleted successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['operations/Currency']);
        },
        (error) => {
          this.snackBar.open('Failed to delete Currency', 'Close', {
            duration: 3000,
          });
          console.error('Error deleting Currency:', error);
        }
      );
    }
  }
}
