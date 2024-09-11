import { TranslationService } from 'app/language/translation.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { BtnComponent } from '@shared/components/buttons/btn/btn.component';
import { RegisterRequest } from '@operations/models/register-request.model';
import { Router } from '@angular/router';
import { CustomerRegisterationFormSerivce } from '@login/services/customer-registeration/customer-registeration-form.service';
import { CustomerRegisterationAPIService } from '@login/services/customer-registeration/customer-registeration.api.service';

@Component({
  selector: 'app-customer-registeration',
  standalone: true,
  imports: [
    CommonModule,
    SubtitleComponent,
    DynamicFormComponent,
    TranslateModule,
    BtnComponent,
  ],
  templateUrl: './customer-registeration.component.html',
  styleUrl: './customer-registeration.component.scss',
})
export class CustomerRegisterationComponent {
  @ViewChild('registerForm') registerForm!: ElementRef;
  model;
  registerRequest: RegisterRequest;

  data;
  constructor(
    private customerRegisterationForm: CustomerRegisterationFormSerivce,
    private customerRegisterationApiService: CustomerRegisterationAPIService,
    private router: Router,
    private translationService: TranslationService
  ) {
    this.model = customerRegisterationForm.init();

    this.customerRegisterationApiService.registerType().subscribe((res) => {
      this.model = customerRegisterationForm.init(res['data']);
    });
  }

  getFormValues(values) {
    this.registerRequest = {
      username: values.username,
      name: values.name,
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: values.email,
      active: true,
      department_id: values.registerType,
    };
  }

  register() {
    this.getFormValues(this.registerForm['dynamicFormGroup'].value);
    if (this.registerForm['dynamicFormGroup'].valid) {
      if (
        this.registerRequest.password != this.registerRequest.confirmPassword
      ) {
        this.translationService.toastrTranslation('error', 'error');
      } else {
        this.customerRegisterationApiService
          .registerCustomerAPI(this.registerRequest)
          .subscribe(
            (res) => {
              this.translationService.toastrTranslation(
                'success',
                'toastr.registeredSuccessfully'
              );
              this.router.navigate(['/main/login']);
            },
            (error) => {
              if(error.error.errors.email){
                this.translationService.toastrTranslation(
                  'error',
                  error.error.errors.email[0]
                );
              }

              if(error.error.errors.username){
                this.translationService.toastrTranslation(
                  'error',
                  error.error.errors.username[0]
                );
              }
            }
          );
      }
    } else {
      // console.log(this.registerForm['dynamicFormGroup']);
      this.registerForm['dynamicFormGroup'].markAllAsTouched();
    }
  }
}
