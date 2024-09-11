import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AuthGuard } from '../guards/auth.guard';

let standardRoutes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        loadChildren: () =>
          import('@public/public.module').then((m) => m.PublicModule),
        data: { breadcrumb: 'main' },
      },
      {
        path: 'admin',
        canActivateChild: [AuthGuard()],
        loadChildren: () =>
          import('@admin/admin.module').then((m) => m.AdminModule),
        data: { breadcrumb: 'dashboard' },
      },
      {
        path: 'operations',
        canActivateChild: [AuthGuard()],
        loadChildren: () =>
          import('@operations/operations.module').then(
            (m) => m.OperationsModule
          ),
        data: { breadcrumb: 'operations' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(standardRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class LayoutRoutingModule {}
