import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@public-pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
    },
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'aboutUs',
        loadComponent: () =>
          import('@public-pages/about-us/about-us.component').then(
            (m) => m.AboutUsComponent
          ),
        data: { breadcrumb: 'about-us' },
      },
      {
        path: 'contactUs',
        loadComponent: () =>
          import('@public-pages/contact-us/contact-us.component').then(
            (m) => m.ContactUsComponent
          ),
        data: { breadcrumb: 'contact-us' },
      },
      {
        path: 'services',
        loadComponent: () =>
          import('@public-pages/services-page/services-page.component').then(
            (m) => m.ServicesPageComponent
          ),
        data: { breadcrumb: 'services' },
      },
      {
        path: 'login',
        loadChildren: () =>
          import('@login/login.module').then((m) => m.LoginModule),
        data: { breadcrumb: 'login' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
