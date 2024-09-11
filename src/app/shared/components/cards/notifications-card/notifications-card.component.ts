import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { NotificationCard } from '@shared/model/card-data.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-notifications-card',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './notifications-card.component.html',
  styleUrl: './notifications-card.component.scss',
})
export class NotificationsCardComponent {
  @Input() card: NotificationCard;
  @Input() requestId;
  constructor(private router: Router) {}
  orderTracking() {
    this.router.navigate([
      'operations/statistics/orderTracking/' + this.requestId,
    ]);
    console.log(this.router.url);
  }
}
