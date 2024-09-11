import { Component } from '@angular/core';
import { PaymentDetailsCardComponent } from '@operations/components/payment-details-card/payment-details-card.component';
import { PaymentSuccessService } from '@operations/services/payment-success.service';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { PaymentDetailsCard } from '@shared/model/card-data.model';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [PaymentDetailsCardComponent, DynamicFormComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
})
export class PaymentSuccessComponent {
  paymentDetails: PaymentDetailsCard[];
  formModel;

  constructor(private paymentSuccessService: PaymentSuccessService) {
    this.paymentDetails = this.paymentSuccessService.paymentDetails;
    this.formModel = this.paymentSuccessService.formModel;
  }
}
