import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsContainerComponent } from './statistics-container.component';

@NgModule({
  declarations: [StatisticsContainerComponent],
  imports: [CommonModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
