import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsLayoutComponent } from './components/operations-layout/operations-layout.component';

const routes: Routes = [
  {
    path: '',
    component: OperationsLayoutComponent,
    data: {
      breadcrumb: null,
    },
    children: [
      { path: '', redirectTo: 'statistics', pathMatch: 'full' },
      {
        path: 'statistics',
        loadChildren: () =>
          import(
            '@operations/pages/statistics-container/statistics.module'
          ).then((m) => m.StatisticsModule),
        data: { breadcrumb: 'statistics' },
      },
      {
        path: 'requestForm/:type/:id',
        loadComponent: () =>
          import(
            '@operations/components/submit-admission-stepper/submit-admission-stepper.component'
          ).then((m) => m.SubmitAdmissionStepperComponent),
        data: { breadcrumb: 'form', sideMenu: false },
      },
      {
        path: 'companyInfo',
        loadComponent: () =>
          import('@operations/pages/company-info/company-info.component').then(
            (m) => m.CompanyInfoComponent
          ),
        data: { breadcrumb: 'companyInfo', sideMenu: false },
      },
      {
        path: 'orderTracking/:id',
        loadComponent: () =>
          import('@shared/pages/order-tracking/order-tracking.component').then(
            (m) => m.OrderTrackingComponent
          ),
        data: { breadcrumb: 'orderTracking', sideMenu: true },
      },
      {
        path: 'rdf',
        loadComponent: () =>
          import(
            '@operations/pages/cement-company-rdf/cement-company-rdf.component'
          ).then((m) => m.CementCompanyRdfComponent),
        data: { breadcrumb: 'cementCompanyPositionOnUse', sideMenu: false },
      },
      {
        path: 'rdf/:id',
        loadComponent: () =>
          import(
            '@operations/pages/cement-company-rdf/cement-company-rdf.component'
          ).then((m) => m.CementCompanyRdfComponent),
        data: { breadcrumb: 'cementCompanyPositionOnUse', sideMenu: false },
      },
      {
        path: 'investorform/:id',
        loadComponent: () =>
          import(
            '@operations/pages/investor-form/investor-form.component'
          ).then((m) => m.InvestorFormComponent),
        data: { breadcrumb: 'cementCompanyPositionOnUse', sideMenu: false },
      },
      {
        path: 'endorsement',
        loadComponent: () =>
          import('@operations/pages/endorsement/endorsement.component').then(
            (m) => m.EndorsementComponent
          ),
        data: { breadcrumb: 'importBox', sideMenu: false },
      },
      {
        path: 'changingPassword',
        loadComponent: () =>
          import(
            '@operations/pages/changing-password/changing-password.component'
          ).then((m) => m.ChangingPasswordComponent),
        data: { breadcrumb: 'changingPassword', sideMenu: false },
      },
      {
        path: 'wasteManagementAdmissionForm',
        loadComponent: () =>
          import(
            '@operations/pages/waste-management-admission-form/waste-management-admission-form.component'
          ).then((m) => m.WasteManagementAdmissionFormComponent),
        data: { breadcrumb: 'requestsSubmitted' },
      },
      {
        path: 'feesAndExpenses/:requestId',
        loadComponent: () =>
          import(
            '@operations/pages/fees-and-expenses/fees-and-expenses.component'
          ).then((m) => m.FeesAndExpensesComponent),
        data: { breadcrumb: 'feesAndExpenses' },
      },
      {
        path: 'successAccountActivation',
        loadComponent: () =>
          import(
            '@operations/pages/success-account-activation/success-account-activation.component'
          ).then((m) => m.SuccessAccountActivationComponent),
        data: { breadcrumb: 'successAccountActivation' },
      },
      {
        path: 'digitalSealingSubmition',
        loadComponent: () =>
          import(
            '@operations/pages/digital-sealing-submition/digital-sealing-submition.component'
          ).then((m) => m.DigitalSealingSubmitionComponent),

        data: { breadcrumb: 'facilityActivation' },
      },

      {
        path: 'requestsSubmitted',
        loadComponent: () =>
          import(
            '@operations/pages/requests-submitted/requests-submitted.component'
          ).then((m) => m.RequestsSubmittedComponent),
        data: { breadcrumb: 'requestsSubmitted' },
      },
      {
        path: 'departments',
        loadComponent: () =>
          import('@operations/pages/departments/all-departments/departments.component').then(
            (m) => m.DepartmentsComponent
          ),
        data: { breadcrumb: 'department' },
      },
      {
        path: 'addDepartment',
        loadComponent: () =>
          import(
            '@operations/pages/departments/add-department/addDepartment.component'
          ).then((m) => m.AddDepartmentComponent),
        data: { breadcrumb: 'addDepartment' },
      },
      {
        path: 'editDepartment/:id',
        loadComponent: () =>
          import(
            '@operations/pages/departments/edit-department/edit-department.component'
          ).then((m) => m.editDepartmentComponent),
        data: { breadcrumb: 'editDepartment' },
      },
      {
        path: 'Users',
        loadComponent: () =>
          import('@operations/pages/users/all-users/users.component').then(
            (m) => m.UsersComponent
          ),
        data: { breadcrumb: 'Users' },
      },
      {
        path: 'addUser',
        loadComponent: () =>
          import('@operations/pages/users/add-user/add-user.component').then(
            (m) => m.AddUserComponent
          ),
        data: { breadcrumb: 'addUser' },
      },
      {
        path: 'editUser/:id',
        loadComponent: () =>
          import('@operations/pages/users/edit-user/edit-user.component').then(
            (m) => m.EditUserComponent
          ),
        data: { breadcrumb: 'editUser' },
      },
      {
        path: 'logs',
        loadComponent: () =>
          import('@operations/pages/logs/logs.component').then(
            (m) => m.LogsComponent
          ),
        data: { breadcrumb: 'logs' },
      },

      {
        path: 'coalRdf',
        loadComponent: () =>
          import('@operations/pages/coal-type-rdf/coal-type-rdf.component').then(
            (m) => m.CoalRdfComponent
          ),
        data: { breadcrumb: 'coalRdf' },
      },
      {
        path: 'coalTypes',
        loadComponent: () =>
          import('@operations/pages/coal-types/all-coal-types/coal-types.component').then(
            (m) => m.CoalTypesComponent
          ),
        data: { breadcrumb: 'coalTypes' },
      },
      {
        path: 'addCoalType',
        loadComponent: () =>
          import('@operations/pages/coal-types/add-coal-type/add-coal-type.component').then(
            (m) => m.AddCoalTypeComponent
          ),
        data: { breadcrumb: 'addCoalType' },
      },
      {
        path: 'editCoalType/:id',
        loadComponent: () =>
          import('@operations/pages/coal-types/edit-coal-type/edit-coal-type.component').then(
            (m) => m.EditCoalTypeComponent

          ),
        data: { breadcrumb: 'editCoalType' },
      },
      {
        path: 'City',
        loadComponent: () =>
          import('@operations/pages/Cities/City/city.component').then(
            (m) => m.CityComponent

          ),
        data: { breadcrumb: 'City' },
      },
      {
        path: 'addCity',
        loadComponent: () =>
          import('@operations/pages/Cities/add-city/add-city.component').then(
            (m) => m.AddCityComponent

          ),
        data: { breadcrumb: 'addCity' },
      },
      {
        path: 'editCity/:id',
        loadComponent: () =>
          import('@operations/pages/Cities/edit-city/edit-city.component').then(
            (m) => m.EditCityComponent

          ),
        data: { breadcrumb: 'editCity' },
      },
      {
        path: 'Country',
        loadComponent: () =>
          import('@operations/pages/country/all-country/country.component').then(
            (m) => m.CountryComponent

          ),
        data: { breadcrumb: 'Country' },
      },
      {
        path: 'addCountry',
        loadComponent: () =>
          import('@operations/pages/country/add-country/add-country.component').then(
            (m) => m.AddCountryComponent

          ),
        data: { breadcrumb: 'addCountry' },
      },
      {
        path: 'editCountry/:id',
        loadComponent: () =>
          import('@operations/pages/country/edit-country/edit-country.component').then(
            (m) => m.EditCountryComponent

          ),
        data: { breadcrumb: 'editCountry' },
      },
      {
        path: 'Currency',
        loadComponent: () =>
          import('@operations/pages/currency/all-currency/currency.component').then(
            (m) => m.CurrencyComponent

          ),
        data: { breadcrumb: 'Currency' },
      },
      {
        path: 'addCurrency',
        loadComponent: () =>
          import('@operations/pages/currency/add-currency/add-currency.component').then(
            (m) => m.AddCurrencyComponent

          ),
        data: { breadcrumb: 'addCurrency' },  
      },
      {
        path: 'editCurrency/:id',
        loadComponent: () =>
          import('@operations/pages/currency/edit-currency/edit-currency.component').then(
            (m) => m.EditCurrencyComponent

          ),
        data: { breadcrumb: 'editCurrency' },
      },
      {
        path: 'importBox',
        loadComponent: () =>
          import('@operations/pages/import-box/import-box.component').then(
            (m) => m.ImportBoxComponent
          ),
        data: { breadcrumb: 'importBox' },
      },
      {
        path: 'unloadType',
        loadComponent: () =>
          import('@operations/pages/unload-type/all-unload-type/unload-type.component').then(
            (m) => m.UnLoadTypeComponent
          ),
        data: { breadcrumb: 'unloadType' },
      },
      {
        path: 'AddUnloadType',
        loadComponent: () =>
          import('@operations/pages/unload-type/add-unload-type/add-unload-type.component').then(
            (m) => m.AddUnLoadTypeComponent
          ),
        data: { breadcrumb: 'AddUnloadType' },
      },
      {
        path: 'editUnLoadType/:id',
        loadComponent: () =>
          import('@operations/pages/unload-type/edit-unload-type/edit-unload-type.component').then(
            (m) => m.EditUnLoadTypeComponent

          ),
        data: { breadcrumb: 'editUnLoadType' },
      },

      {
        path: 'Harbors',
        loadComponent: () =>
          import('@operations/pages/harbor/all-harbors/harbors.component').then(
            (m) => m.HarborsComponent
          ),
        data: { breadcrumb: 'Harbors' },
      },
      {
        path: 'addHarbor',
        loadComponent: () =>
          import('@operations/pages/harbor/add-harbor/add-harbor.component').then(
            (m) => m.AddHarborComponent
          ),
        data: { breadcrumb: 'addHarbor' },
      },
      {
        path: 'editHarbor/:id',
        loadComponent: () =>
          import('@operations/pages/harbor/edit-harbor/edit-harbor.component').then(
            (m) => m.EditHarborComponent

          ),
        data: { breadcrumb: 'editHarbor' },
      },
      {
        path: 'Services',
        loadComponent: () =>
          import('@operations/pages/services/all-services/services.component').then(
            (m) => m.ServiceComponent
          ),
        data: { breadcrumb: 'Services' },
      },
      {
        path: 'addService',
        loadComponent: () =>
          import('@operations/pages/services/add-service/add-service.component').then(
            (m) => m.AddServiceComponent
          ),
        data: { breadcrumb: 'addService' },
      },
      {
        path: 'editService/:id',
        loadComponent: () =>
          import('@operations/pages/services/edit-service/edit-service.component').then(
            (m) => m.EditServiceComponent

          ),
        data: { breadcrumb: 'editService' },
      },
      {
        path: 'CompanyActivity',
        loadComponent: () =>
          import('@operations/pages/company-activities/all-company-activity/company-activity.component').then(
            (m) => m.CompanyActivityComponent
          ),
        data: { breadcrumb: 'CompanyActivity' },
      },
      {
        path: 'addCompanyActivity',
        loadComponent: () =>
          import('@operations/pages/company-activities/add-company-activity/add-company-activity.component').then(
            (m) => m.AddCompanyActivityComponent
          ),
        data: { breadcrumb: 'addCompanyActivity' },
      },
      {
        path: 'editCompanyActivity/:id',
        loadComponent: () =>
          import('@operations/pages/company-activities/edit-company-activity/edit-company-activity.component').then(
            (m) => m.EditCompanyActivityComponent
          ),
        data: { breadcrumb: 'editCompanyActivity' },
      },
     
      {
        path: 'Roles',
        loadComponent: () =>
          import('@operations/pages/roles/all-roles/roles.component').then(
            (m) => m.RolesComponent
          ),
        data: { breadcrumb: 'Roles' },
      },
      {
        path: 'addRole',
        loadComponent: () =>
          import('@operations/pages/roles/add-role/add-role.component').then(
            (m) => m.AddRoleComponent
          ),
        data: { breadcrumb: 'addRole' },
      },
      {
        path: 'editRole/:id',
        loadComponent: () =>
          import('@operations/pages/roles/edit-role/edit-role.component').then(
            (m) => m.EditRoleComponent
          ),
        data: { breadcrumb: 'editRole' },
      },
      {
        path: 'SubDepartments',
        loadComponent: () =>
          import('@operations/pages/sub-departments/all-sub-departments/sub-departments.component').then(
            (m) => m.SubDepartmentsComponent
          ),
        data: { breadcrumb: 'SubDepartments' },
      },
      {
        path: 'AddSubDepartment',
        loadComponent: () =>
          import('@operations/pages/sub-departments/add-sub-department/add-sub-department.component').then(
            (m) => m.AddSubDepartmentComponent
          ),
        data: { breadcrumb: 'AddSubDepartment' },
      },
      {
        path: 'editSubDepartment/:id',
        loadComponent: () =>
          import('@operations/pages/sub-departments/edit-sub-department/edit-sub-department.component').then(
            (m) => m.EditSubDepartmentComponent
          ),
        data: { breadcrumb: 'editSubDepartment' },
      },
      
      {
        path: 'paymentOfFees',
        loadComponent: () =>
          import(
            '@operations/pages/payment-of-fees/payment-of-fees.component'
          ).then((m) => m.PaymentOfFeesComponent),
        data: { breadcrumb: 'paymentOfFees' },
      },
      {
        path: 'paymentDetails/:requestId',
        loadComponent: () =>
          import(
            '@operations/pages/payment-details/payment-details.component'
          ).then((m) => m.PaymentDetailsComponent),
        data: { breadcrumb: 'paymentDetails' },
      },
      {
        path: 'serviceEvaluation',
        loadComponent: () =>
          import(
            '@operations/pages/service-evaluation/service-evaluation.component'
          ).then((m) => m.ServiceEvaluationComponent),
        data: { breadcrumb: 'serviceEvaluation' },
      },
      {
        path: 'complains',
        loadComponent: () =>
          import('@operations/pages/complains/complains.component').then(
            (m) => m.ComplainsComponent
          ),
        data: { breadcrumb: 'complains' },
      },
      {
        path: 'approval/:id/:status',
        loadComponent: () =>
          import(
            '@operations/pages/approval-form-wrapper/approval-form-wrapper.component'
          ).then((m) => m.ApprovalFormWrapperComponent),
        data: { breadcrumb: 'approvalForm', sideMenu: false },
      },
      {
        path: 'approval-Form/:id/:status',
        loadComponent: () =>
          import(
            '@operations/pages/approval-form/approval-form.component'
          ).then((m) => m.ApprovalFormComponent),
        data: { breadcrumb: 'approvalForm', sideMenu: false },
      },
      {
        path: 'report',
        loadComponent: () =>
          import('@operations/pages/report/report.component').then(
            (m) => m.ReportComponent
          ),
        data: { breadcrumb: 'reports', sideMenu: false },
      },
      // {
      //   path: 'paymentSuccess',
      //   loadComponent: () =>
      //     import(
      //       '@operations/pages/payment-success/payment-success.component'
      //     ).then((m) => m.PaymentSuccessComponent),
      //   data: { breadcrumb: 'paymentSuccess', sideMenu: false },
      // },
      {
        path: 'acceptInvoiceForm/:requestId/:AppNum',
        loadComponent: () =>
          import(
            '@operations/pages/accept-payment-form/accept-payment-form.component'
          ).then((m) => m.AcceptPaymentFormComponent),
        data: { breadcrumb: 'acceptForm', sideMenu: false },
      },
      {
        path: 'acceptFormTemplate/:requestId',
        loadComponent: () =>
          import(
            '@operations/pages/accept-template-form/accept-template-form.component'
          ).then((m) => m.AcceptTemplateFormComponent),
        data: { breadcrumb: 'acceptForm', sideMenu: true },
      },
      {
        path: 'trasport-companies-performance/:companyId',
        loadComponent: () =>
          import(
            '@operations/pages/performace-reports/trasport-companies/trasport-companies.component'
          ).then((m) => m.TrasportCompaniesComponent),
        data: { breadcrumb: 'transport-company', sideMenu: true },
      },
      {
        path: 'plant-coal',
        loadComponent: () =>
          import('@operations/pages/plant-coal/plant-coal.component').then(
            (m) => m.PlantCoalComponent
          ),
        data: { breadcrumb: 'plant-coal', sideMenu: true },
      },
      {
        path: 'plant-coal/:formType/:id',
        loadComponent: () =>
          import('@operations/pages/plant-coal/plant-coal.component').then(
            (m) => m.PlantCoalComponent
          ),
        data: { breadcrumb: 'plant-coal', sideMenu: true },
      },
      {
        path: 'plant-coal/change-harbor',
        loadComponent: () =>
          import(
            '@operations/pages/change-harbor/change-harbor.component'
          ).then((m) => m.ChangeHarborComponent),
      },
      {
        path: 'acceptTemplateCompcPlant/:requestId',
        loadComponent: () =>
          import(
            '@operations/pages/accept-form-coal-plant/accept-form-coal-plant.component'
          ).then((m) => m.AcceptFormCoalPlantComponent),
        data: { breadcrumb: 'acceptForm', sideMenu: true },
      },
      {
        path: 'acceptTemplateNPlant/:requestId',
        loadComponent: () =>
          import(
            '@operations/pages/accept-form-coal-plant-normal/accept-form-coal-plant-normal.component'
          ).then((m) => m.AcceptFormCoalPlantNormalComponent),
        data: { breadcrumb: 'acceptForm', sideMenu: true },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
