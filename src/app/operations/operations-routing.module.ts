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
          import(
            '@operations/pages/departments/departments.component'
          ).then((m) => m.DepartmentsComponent),
        data: { breadcrumb: 'department' },
      },
      {
        path: 'addDepartment',
        loadComponent: () =>
          import(
            '@operations/pages/addDepartment/addDepartment.component'
          ).then((m) => m.AddDepartmentComponent),
        data: { breadcrumb: 'addDepartment' },
      },
      {
        path: 'editDepartment/:id',
        loadComponent: () =>
          import('@operations/pages/edit-department/edit-department.component').then(
            (m) => m.editDepartmentComponent
          ),
        data: { breadcrumb: 'editDepartment' },
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
