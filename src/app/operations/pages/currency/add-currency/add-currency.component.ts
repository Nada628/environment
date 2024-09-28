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
import { CurrencyApiService } from '@shared/services/currency.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
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
  styleUrls: ['./add-currency.component.scss'],
})
export class AddCurrencyComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      currency: ['', Validators.required],
      code: ['', [Validators.required,]],
    });

  }

  onSubmit() {
    this.submitted = true;
    this.formGroup.markAllAsTouched(); 
  
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
  
      const formData = {
        name: formValue.currency,   
        code: formValue.code,  
        entity_id: 1 ,// Static value
        changer_id:1 // Static value
      };
  
      this.currencyService.add(formData).subscribe(
        () => {
          this.snackBar.open('currency added successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['operations/Currency']);
        },
        (error) => {
          this.snackBar.open('Failed to add currency. Please try again.', 'Close', { duration: 3000 });
          console.error('Error adding currency:', error);
        }
      );
    }
  }
  



}
