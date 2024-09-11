import { StatisticsService } from '@operations/services/statistics.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { NotificationsSectionComponent } from '@operations/components/notifications-section/notifications-section.component';
import { TotalOrdersSectionComponent } from '@operations/components/total-orders-section/total-orders-section.component';
import { StatisticsChartSectionComponent } from '@operations/components/statistics-chart-section/statistics-chart-section.component';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    SubtitleComponent,
    SharedModule,
    NotificationsSectionComponent,
    TotalOrdersSectionComponent,
    StatisticsChartSectionComponent,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
  TotalRequestsCard;
  totals;
  chartCardsArr;
  role = localStorage.getItem('roles')
  constructor(
    private statisticsService: StatisticsService,
    private requestSubmitted: RequestSubmittedService
  ) {}

  ngOnInit() {
    this.getDashboardData();
    this.initNotification();
  }

  getDashboardData() {
    // this.statisticsService.getDashboardData().subscribe((res) => {
    //   let allObj = res['content'].filter((item) => item.type === 'ALL')[0];
    //   //  this.TotalRequestsCard =
    //   //  this.statisticsService.getTotalRequestCards(allObj);
    //   this.totals = this.statisticsService.getTotals(allObj.totalPaid);
    //   let weeklyObj = res['content'].filter(
    //     (item) => item.type === 'Weekly'
    //   )[0];
    //   let monthlyObj = res['content'].filter(
    //     (item) => item.type === 'Monthly'
    //   )[0];
    //   let statisticsObj = { weeklyObj, monthlyObj };
    //   this.chartCardsArr =
    //     this.statisticsService.getChartCardsArr(statisticsObj);
    // });
    console.log('getDashboardData');
  }
  initNotification() {
    if(this.role !== 'customer'){
    this.requestSubmitted.getCustomerRequests().subscribe((response) => {
      // this.importBoxService.initNotifications(response['content']);
      this.statisticsService.setNotification(response as []);
      this.TotalRequestsCard = this.statisticsService.notificationCards;
      this.totals = this.statisticsService.notificationCards.length;
    });
  }
  }
}
