import { PaymentOfFeesService } from './../../services/payment-of-fees.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { NotificationsCardComponent } from '@shared/components/cards/notifications-card/notifications-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { ComplainsService } from '@operations/services/complains.service';

@Component({
  selector: 'app-payment-of-fees',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    NotificationsCardComponent,
    BtnDropdownComponent,
    RouterLink,
    NzSelectModule,
    FormsModule,
  ],
  templateUrl: './payment-of-fees.component.html',
  styleUrl: './payment-of-fees.component.scss',
})
export class PaymentOfFeesComponent {
  dropDownList;
  requestId;
  selectedRequest;

  constructor(
    private paymentOfFeesService: PaymentOfFeesService,
    private complainsService: ComplainsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class. 
    this.getPaymentDetails('');
    this.getRequests();
  }

  getRequests() {
    this.complainsService
      .getRequests()
      .subscribe((res) => (this.dropDownList = res['data']));
  }

  paymentArray;
  getPaymentDetails(event) {
    this.paymentOfFeesService.getPaymentDetails(event).subscribe(
      (data) => {
        this.paymentArray = data['data'];
        console.log(this.paymentArray);
      },
      (error) => {
        console.error('Error fetching payment details:', error);
      }
    );
  }

  orderTracking() {
    console.log('orderTracking');
  }
}
