import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { NotificationsCardComponent } from '@shared/components/cards/notifications-card/notifications-card.component';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { PaymentOfFeesService } from '@operations/services/payment-of-fees.service';
import { ComplainsService } from '@operations/services/complains.service';
import { RequestsSubmittedComponent } from '../requests-submitted/requests-submitted.component';

@Component({
  selector: 'app-import-box',
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
    RequestsSubmittedComponent,
  ],
  templateUrl: './import-box.component.html',
  styleUrl: './import-box.component.scss',
})
export class ImportBoxComponent implements OnInit {
  dropDownList;
  requestId;
  selectedRequest;
  role:any = localStorage.getItem('roles')
  constructor(
    private paymentOfFeesService: PaymentOfFeesService,
    private complainsService: ComplainsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class. 
    if (this.role == 'department_supervisor') {
      this.getPayments()
    } 
    else if(this.role == 'investors'){
      // this.getInvistorsPayment()
    }
    else {
      this.getPaymentDetails('');
    }
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
  getPayments(){
    this.paymentOfFeesService.getPayments().subscribe(
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
  getInvistorsPayment(){
    this.paymentOfFeesService.getInvistorsPayment().subscribe(
      (data) => {
        this.paymentArray = data['data'];
        console.log(this.paymentArray);
      },
      (error) => {
        console.error('Error fetching payment details:', error);
      }
    );
  }
}
