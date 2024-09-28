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
          { name: 'routingHeader.SubDepartments', url: '/operations/SubDepartments' },
          { name: 'routingHeader.Users', url: '/operations/Users' },
          { name: 'routingHeader.logs', url: '/operations/logs' },
          { name: 'routingHeader.coalRdf', url: '/operations/coalRdf' },
          { name: 'routingHeader.coalTypes', url: '/operations/coalTypes' },
          { name: 'routingHeader.City', url: '/operations/City' },
          { name: 'routingHeader.Country', url: '/operations/Country' },
          { name: 'routingHeader.Currency', url: '/operations/Currency' },
          { name: 'routingHeader.unloadType', url: '/operations/unloadType' },
          { name: 'routingHeader.Harbors', url: '/operations/Harbors' },
          { name: 'routingHeader.Services', url: '/operations/Services' },
          { name: 'routingHeader.CompanyActivity', url: '/operations/CompanyActivity' },
          { name: 'routingHeader.Roles', url: '/operations/Roles' },

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
