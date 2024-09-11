import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './operations-routing.module';
import { SharedModule } from '@shared/shared.module';
import { OperationsLayoutComponent } from './components/operations-layout/operations-layout.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';

@NgModule({
  declarations: [OperationsLayoutComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    SidebarComponent,
  ],
})
export class OperationsModule {}
