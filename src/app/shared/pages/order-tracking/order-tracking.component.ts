import { OrderTrackingService } from './../../services/order-tracking.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss',
})
export class OrderTrackingComponent {
  @Input() requestId;
  @Input() category;
  orderTrackingList;
  activeItemsTotal = 0;
  isRequestRdf = false;

  constructor(
    private orderTrackingService: OrderTrackingService,
    private route: ActivatedRoute
  ) {
    this.orderTrackingList = this.orderTrackingService.orderTrackingList;
    this.route.params.subscribe((params) => {
      this.requestId = params['id'];
    });

    for (let x of this.orderTrackingList) {
      if (x.date) {
        this.activeItemsTotal += 1;
      }
    }
    this.checkIfRequestIsRdf(this.requestId);
  }

  getOrderTrackingByRequestId(id) {
    this.orderTrackingService
      .getOrderTrackingByRequestId(id)
      .subscribe(
        (res) =>
          (this.orderTrackingList =
            this.orderTrackingService.initOrderTrackingList(
              res['content'],
              this.isRequestRdf
            ))
      );
  }

  checkIfRequestIsRdf(id) {
    // this.rdfApiService.getRdfRequestById(id).subscribe(res=>  {
    //   this.isRequestRdf = res['content'] ? true : false;
    //   this.getOrderTrackingByRequestId(id)
    // })
  }
}
