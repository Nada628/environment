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
import { CityApiService } from '@shared/services/city.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
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
  styleUrls: ['./edit-city.component.scss'],
})
export class EditCityComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  cityId!: number;

  constructor(
    private fb: FormBuilder,
    private cityService: CityApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      city: ['', Validators.required], 
      country_id: ['', [Validators.required]],
      notes: ['', Validators.required], 
    });
  
    // Get the City ID from the route
    const idParam = this.route.snapshot.paramMap.get('id');
    this.cityId = idParam !== null ? Number(idParam) : null;
  
    if (this.cityId) {
      this.loadCity(this.cityId);
    }
  }
  


  loadCity(id: number) {
    this.cityService.getCityById(id).subscribe(
      (response) => {
        console.log('city data received from API:', response);
        
        const data = response.data;
  
        // Pre-fill the form with the fetched user data
        if (data) {
          this.formGroup.patchValue({
            city: data.name || '',         
            country_id: data.country_id || '',
            notes: data.desc || '',       
          });
        }
      },
      (error) => {
        this.snackBar.open('Failed to load coal data', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching coal data:', error);
      }
    );
  }
  


  onUpdate() {
    this.submitted = true;
  
    if (this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
  
      const formValue = this.formGroup.value;
      
      const formData = {
        id: this.cityId, 
        name: formValue.city,
        country_id: formValue.country_id,
        desc: formValue.notes, 
      };
  
      this.cityService.updateCity(formData).subscribe(
        () => {
          this.toastr.success('تم تعديل بيانات مدينة بنجاح');
          this.router.navigate(['operations/City']);
        },
        (error) => {
          this.toastr.error('خطأ في تعديل بيانات المدينة حاول مرة أخرى');
          console.error('Error updating City:', error);
        }
      );
    }
  }
  

  onCancel() {
    this.router.navigate(['operations/City']);
  }

  onDelete() {
    if (this.cityId) {
      this.cityService.deleteCity(this.cityId).subscribe(
        () => {
          this.toastr.success('تم  حذف مدينة بنجاح');

          this.router.navigate(['operations/City']);
        },
        (error) => {
          this.toastr.error('خطأ في حذف المدينة حاول مرة أخرى');

          console.error('Error deleting city:', error);
        }
      );
    }
  }
}
