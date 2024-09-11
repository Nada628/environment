import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { NotificationsCardComponent } from '@shared/components/cards/notifications-card/notifications-card.component';
import { StatisticsService } from '@operations/services/statistics.service';
import { NotificationCard } from '@shared/model/card-data.model';

@Component({
  selector: 'app-notifications-section',
  standalone: true,
  imports: [CommonModule, NotificationsCardComponent, SharedModule],
  templateUrl: './notifications-section.component.html',
  styleUrl: './notifications-section.component.scss',
})
export class NotificationsSectionComponent {
  @Input() notificationCards: NotificationCard[];

  constructor(private statisticsService: StatisticsService) {
    this.notificationCards = this.statisticsService.notificationCards;
  }
}
