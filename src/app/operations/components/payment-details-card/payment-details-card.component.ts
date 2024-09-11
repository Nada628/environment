import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-payment-details-card',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './payment-details-card.component.html',
  styleUrl: './payment-details-card.component.scss',
})
export class PaymentDetailsCardComponent {
  @Input() paymentDetails;
  @Input() title;
}
