import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DynamicTableWrapper } from './components/dynamic-table-wrapper/dynamic-table-wrapper.component';
import { AdminComponentsWrapperComponent } from './components/admin-components-wrapper/admin-components-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: {
      breadcrumb: null,
    },
    children: [
      { path: '', redirectTo: 'administration', pathMatch: 'full' },
      {
        path: ':id',
        component: AdminComponentsWrapperComponent,
        data: { breadcrumb: null },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
