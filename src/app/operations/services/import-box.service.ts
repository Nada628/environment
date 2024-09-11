import { Injectable } from '@angular/core';
import { NotificationCard } from '@shared/model/card-data.model';
import { DropDownItem } from '@shared/model/dropDown.model';

@Injectable({
  providedIn: 'root',
})
export class ImportBoxService {
  dropDownList: DropDownItem[];
  notificationCards: NotificationCard[] = [];
  constructor() {
    this.dropDownList = [
      {
        name: 'Category 1',
      },
      {
        name: 'Category 2',
      },
      {
        name: 'Category 3',
      },
      {
        name: 'Category 4',
      },
      {
        name: 'Category 5',
      },
      {
        name: 'Category 6',
      },
    ];
  }

  initNotifications(requestsList) {
    requestsList.map((request) => {
      this.notificationCards.push({
        acceptanceStatus: request.status,
        applicationNumber: request.id,
        office: 'customer.environmentalProtectionFund', // to be changed
        orderDate: request.createdDate, // to be changed
        title: request['requestType'].name,
      });
    });
  }
}
