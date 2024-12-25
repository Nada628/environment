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
import { HarborApiService } from '@shared/services/harbor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-harbor',
  templateUrl: './edit-harbor.component.html',
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
  styleUrls: ['./edit-harbor.component.scss'],
})
export class EditHarborComponent implements OnInit {
  formGroup!: FormGroup;
  submitted = false;
  harborId!: number;
  countries: any[] = []; 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private harborService: HarborApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      harbor: ['', Validators.required],  
      code: ['', Validators.required],       
      harbor_type: ['', Validators.required],       
      country_id: ['', Validators.required],    
    });

   this.harborService.getCountry().subscribe(
    (response) => {
      this.countries = response.countries || []; 
      this.loadHarbor(this.route.snapshot.paramMap.get('id'));
    },
    (error) => {
      console.error('Error fetching countries:', error);
    }
  );
}

loadHarbor(id: string | null) {
  if (id) {
    this.harborId = Number(id);
    this.harborService.getoneById(this.harborId).subscribe(
      (response) => {
        const data = response.data;
        if (data) {
          this.formGroup.patchValue({
            harbor: data.name || '',  
            code: data.code || '',      
            harbor_type: data.harbor_type || '',      
            country_id: data.country_id || '',          
          });
        }
      },
      (error) => {
        console.error('Error fetching harbor data:', error);
      }
    );
  }
}

onUpdate() {
  this.submitted = true;
  if (this.formGroup.valid) {
    const formValue = this.formGroup.value;
    const formData = {
      id: this.harborId,
      name: formValue.harbor,
      code: formValue.code,
      harbor_type: formValue.harbor_type,
      country_id: formValue.country_id,
      changer_id: 1, //static value
      entity_id: 1,  //static value
    };

    this.harborService.update(formData).subscribe(
      () => {
        this.toastr.success('تم تعديل الميناء بنجاح');
        this.router.navigate(['operations/Harbors']);
      },
      (error) => {
        this.toastr.error('خطأ في تعديل الميناء حاول مرة أخرى');
        console.error('Error updating harbor:', error);
      }
    );
  }
}

  onCancel() {
    this.router.navigate(['operations/Harbors']);
  }

  onDelete() {
    if (this.harborId) {
      this.harborService.delete(this.harborId).subscribe(
        () => {
          this.toastr.success('تم حذف الميناء بنجاح');
          this.router.navigate(['operations/Harbors']);
        },
        (error) => {
          this.toastr.error('خطأ في حذف الميناء حاول مرة أخرى');
          console.error('Error deleting harbor:', error);
        }
      );
    }
  }
}
