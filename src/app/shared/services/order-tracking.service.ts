import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root',
})
export class OrderTrackingService {
  orderTrackingList;
  baseUrl;
  constructor(
    private http: HttpClient,
    private utilsService: UtilitiesService
  ) {
    this.baseUrl = environment.apiUrl;
    this.orderTrackingList = [
      {
        administrativeId: 0,
        name: 'customer.appSubmition',
        date: '23/7/2024 12:00:00 AM',
        status: true,
      },
      {
        administrativeId: 11,
        name: 'customer.wasteManagement',
        date: '',
        status: false,
      },
      {
        administrativeId: 8,
        name: 'customer.coalUnit',
        date: '',
        status: false,
      },
      {
        administrativeId: 12,
        name: 'customer.environmentalProtectionFund',
        date: '',
        status: false,
      },
      {
        administrativeId: 10,
        name: 'customer.investorServiceOffice',
        date: '',
        status: false,
      },
    ];
  }

  initOrderTrackingList(trackingListResponse, isRdf) {
    console.log(isRdf);
    for (let i = 0; i < this.orderTrackingList.length; i++) {
      let orderItem = this.orderTrackingList[i];
      let apiItem = trackingListResponse.find(
        (item) => item.administrativeId === orderItem.administrativeId
      );
      if (apiItem) {
        orderItem.status = apiItem.status;
        orderItem.state = apiItem.state;
        orderItem.date = apiItem.createdDate
          ? this.utilsService.convertDateWithTime(apiItem.createdDate)
          : null;
      }
    }

    if (!isRdf) {
      this.orderTrackingList.splice(1, 1);
    }
    return this.orderTrackingList;
  }

  getOrderTrackingByRequestId(id) {
    const url =
      this.baseUrl +
      '/portal/customer-request/track-request-status?requestId=' +
      id;
    return this.http.get(url);
  }
}
