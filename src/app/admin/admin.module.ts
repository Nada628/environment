import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DynamicTableWrapper } from './components/dynamic-table-wrapper/dynamic-table-wrapper.component';
import { AdminUtilitiesService } from './services/admin-utils.service';
import { DynamicTableComponent } from '@shared/components/dynamic-table/dynamic-table.component';
import { RouterModule } from '@angular/router';
import { BtnComponent } from '@shared/components/buttons/btn/btn.component';
import { SharedModule } from '@shared/shared.module';
import { AdminComponentsWrapperComponent } from './components/admin-components-wrapper/admin-components-wrapper.component';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';

@NgModule({
  providers: [AdminUtilitiesService],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    DynamicTableWrapper,
    AdminComponentsWrapperComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SidebarComponent,
    DynamicTableComponent,
    RouterModule,
    SharedModule,
    BtnComponent,
    DynamicDialogComponent
  ],
})
export class AdminModule {}
