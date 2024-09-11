import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsContainerComponent } from './statistics-container.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticsContainerComponent,
    data: {
      breadcrumb: null,
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '@operations/pages/statistics-container/statistics/statistics.component'
          ).then((m) => m.StatisticsComponent),
        data: { breadcrumb: null },
      },
      {
        path: 'orderTracking/:id',
        loadComponent: () =>
          import('@shared/pages/order-tracking/order-tracking.component').then(
            (m) => m.OrderTrackingComponent
          ),
        data: { breadcrumb: 'orderTracking' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
