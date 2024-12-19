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
import { ToastrService } from 'ngx-toastr';
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
    private currencyService: CurrencyApiService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      currency: ['', Validators.required],  
      code: ['', Validators.required],      
    });
  
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

        if (data) {
          this.formGroup.patchValue({
            currency: data.name || '',  
            code: data.code || '',      
          });
        }
      },
      (error) => {
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
        name: formValue.currency,  
        code: formValue.code,      
        entity_id: '1',            
        changer_id: '1'            
      };
  
      this.currencyService.update(formData).subscribe(
        () => {
          this.toastr.success('تم تعديل العملة بنجاح');
          this.router.navigate(['operations/Currency']);
        },
        (error) => {
          this.toastr.error('خطأ اثناء تعديل العملة حاول مرة أخرى');
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
          this.toastr.success('تم حذف العملة بنجاح');
          this.router.navigate(['operations/Currency']);
        },
        (error) => {
          this.toastr.error('خطأ أثناء حذف العملة برجاء المحاولة مرة أخرى');
          console.error('Error deleting Currency:', error);
        }
      );
    }
  }
}
