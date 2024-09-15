import { Injectable } from '@angular/core';
import { SidebarItem } from '@shared/model/sidebar-item';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  customerSidebarItems: SidebarItem[];
  superadminSidebarItems: SidebarItem[];


  constructor() {
    this.customerSidebarItems = [
      { name: 'routingHeader.statistics', url: '/operations/statistics' },
      {name: 'routingHeader.requestsSubmitted',url: '/operations/requestsSubmitted', },
      { name: 'routingHeader.importBox', url: '/operations/importBox' },
      { name: 'routingHeader.paymentOfFees', url: '/operations/paymentOfFees' },
      { name: 'routingHeader.serviceEvaluation', url: '/operations/serviceEvaluation', },
      { name: 'routingHeader.complains', url: '/operations/complains' },
    ];
    this.superadminSidebarItems = [
          { name: 'routingHeader.department', url: '/operations/departments' },
          { name: 'routingHeader.statistics', url: '/operations/statistics' },

    ];
  }
  getSidebarItems(role: string): SidebarItem[] {
    if (role === 'superadmin') {
      return this.superadminSidebarItems;
    }
    return this.customerSidebarItems;
  }

  getStatus(id) {
    let status;
    switch (id) {
      case 8: // coal supervisor
        status = 'Accept';
        break;
      case 9: // coal 2nd supervisor
        status = 'Accept';
        break;
      case 10: // Invest supervisor
        status = 'AcceptedInvest';
        break;
      case 11: // rdf supervisor
        status = 'AcceptRDF';
        break;
      case 12: // Protect supervisor
        status = 'AcceptProtectEEA';
        break;
      case 13:
        status = 'CustomerPAID';
        break;
      default:
        status = 'Accepted';
    }
    return status;
  }
}
