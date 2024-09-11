import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@login/pages/login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
    },
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'forgetPassword',
        component: ForgetPasswordComponent,
      },
      {
        path: 'registerCompany',
        canActivate: [AuthGuard()],
        loadComponent: () =>
          import(
            '@login/pages/company-registeration/company-form.component'
          ).then((m) => m.CompanyFormComponent),
        data: { breadcrumb: 'registerCompany' },
      },
      {
        path: 'validateCompany',
        canActivate: [AuthGuard()],
        loadComponent: () =>
          import(
            '@login/pages/company-validation/company-validation.component'
          ).then((m) => m.CompanyValidationComponent),
        data: { breadcrumb: 'companyValidation' },
      },
      {
        path: 'registerCustomer',
        loadComponent: () =>
          import(
            '@login/pages/customer-registeration/customer-registeration.component'
          ).then((m) => m.CustomerRegisterationComponent),
        data: { breadcrumb: 'registerCustomer' },
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
