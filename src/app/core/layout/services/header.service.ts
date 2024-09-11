import { Injectable } from '@angular/core';
import { MainHeaderItem, MenutItem } from '../models/menu-header.model';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  menuItems = [
    {
      role: ['admin'],
      menuItems: [],
    },
    {
      role: ['top_manager'],
      menuItems: [
        {
          name: 'routingHeader.statistics',
          path: '/operations/statistics',
        },
        {
          name: 'routingHeader.requestsSubmitted',
          path: '/operations/requestsSubmitted',
        },
        {
          name: 'routingHeader.importBox',
          path: '/operations/importBox',
        },
        {
          name: 'routingHeader.reports',
          path: '/operations/report',
        },
      ],
    },
    {
      role: ['manager'],
      menuItems: [
        {
          name: 'routingHeader.statistics',
          path: '/operations/statistics',
        },
        {
          name: 'routingHeader.requestsSubmitted',
          path: '/operations/requestsSubmitted',
        },
        {
          name: 'routingHeader.importBox',
          path: '/operations/importBox',
        },
      ],
    },
    {
      role: ['customer'],
      menuItems: [
        {
          name: 'routingHeader.main',
          path: '/main',
        },
        {
          name: 'routingHeader.statistics',
          path: '/operations/statistics',
        },
        {
          name: 'routingHeader.requestsSubmitted',
          path: '/operations/requestsSubmitted',
        },
        {
          name: 'routingHeader.importBox',
          path: '/operations/importBox',
        },
        {
          name: 'routingHeader.requestForm',
          path: '/main/services',
          // path: '/operations/requestForm/add/new',
        },
      ],
    },
    {
      role: ['investor-agent'],
      menuItems: [
        {
          name: 'routingHeader.statistics',
          path: '/operations/statistics',
        },
        {
          name: 'routingHeader.requestsSubmitted',
          path: '/operations/requestsSubmitted',
        },
        {
          name: 'routingHeader.importBox',
          path: '/operations/importBox',
        },
        {
          name: 'routingHeader.reports',
          path: '/operations/report',
        },
      ],
    },
    {
      role: ['officer'],
      menuItems: [
        {
          name: 'routingHeader.statistics',
          path: '/operations/statistics',
        },
        {
          name: 'routingHeader.requestsSubmitted',
          path: '/operations/requestsSubmitted',
        },
        {
          name: 'routingHeader.importBox',
          path: '/operations/importBox',
        },
      ],
    },
    {
      role: ['department_supervisor'],
      menuItems: [
        {
          name: 'routingHeader.statistics',
          path: '/operations/statistics',
        },
        {
          name: 'routingHeader.requestsSubmitted',
          path: '/operations/requestsSubmitted',
        },
        {
          name: 'routingHeader.importBox',
          path: '/operations/importBox',
        },
        {
          name: 'routingHeader.changingPassword',
          path: '/operations/changingPassword',
        },
      ],
    },
    {
      role: ['environmental.found'],
      menuItems: [
        {
          name: 'routingHeader.statistics',
          path: '/operations/statistics',
        },
        {
          name: 'routingHeader.requestsSubmitted',
          path: '/operations/requestsSubmitted',
        },
        {
          name: 'routingHeader.importBox',
          path: '/operations/importBox',
        },
        {
          name: 'routingHeader.changingPassword',
          path: '/operations/changingPassword',
        },
      ],
    },
    {
      role: ['investors'],
      menuItems: [
        {
          name: 'routingHeader.statistics',
          path: '/operations/statistics',
        },
        {
          name: 'routingHeader.requestsSubmitted',
          path: '/operations/requestsSubmitted',
        },
        {
          name: 'routingHeader.importBox',
          path: '/operations/importBox',
        },
        {
          name: 'routingHeader.changingPassword',
          path: '/operations/changingPassword',
        },
      ],
    },
    {
      role: ['manager'],
      menuItems: [
        {
          name: 'routingHeader.statistics',
          path: '/operations/statistics',
        },
        {
          name: 'routingHeader.requestsSubmitted',
          path: '/operations/requestsSubmitted',
        },
        {
          name: 'routingHeader.importBox',
          path: '/operations/importBox',
        },
        {
          name: 'routingHeader.changingPassword',
          path: '/operations/changingPassword',
        },
      ],
    },
    {
      role: ['employee'],
      menuItems: [
        {
          name: 'routingHeader.statistics',
          path: '/operations/statistics',
        },
        {
          name: 'routingHeader.requestsSubmitted',
          path: '/operations/requestsSubmitted',
        },
        {
          name: 'routingHeader.importBox',
          path: '/operations/importBox',
        },
        {
          name: 'routingHeader.changingPassword',
          path: '/operations/changingPassword',
        },
      ],
    },
    {
      role: ['rdf'],
      menuItems: [
        {
          name: 'routingHeader.statistics',
          path: '/operations/statistics',
        },
        {
          name: 'routingHeader.requestsSubmitted',
          path: '/operations/requestsSubmitted',
        },
        {
          name: 'routingHeader.importBox',
          path: '/operations/importBox',
        },
        {
          name: 'routingHeader.changingPassword',
          path: '/operations/changingPassword',
        },
      ],
    },
    {
      role: ['default'],
      menuItems: [
        {
          name: 'routingHeader.main',
          path: '/main',
        },
        {
          name: 'routingHeader.services',
          path: '/main/services',
        },
        {
          name: 'routingHeader.about-us',
          path: '/main/aboutUs',
        },
        {
          name: 'routingHeader.contact-us',
          path: '/main/contactUs',
        },
      ],
    },
  ];

  loggedInUserMenu: MenutItem[] = [
    {
      name: 'customer.companyInfo',
      path: 'operations/companyInfo',
      action: 'route',
    },
    {
      name: 'customer.customerRequests',
      path: 'operations/requestsSubmitted',
      action: 'route',
    },
    {
      name: 'customer.changePassword',
      path: 'operations/changingPassword',
      action: 'route',
    },
    // {
    //   name: 'routingHeader.company',
    //   path: 'main/login',
    //   action: 'route',
    // },
    // { name: 'header.logout', action: 'logout' },
  ];

  constructor() {}

  getMenuHeader(role): MainHeaderItem {
    return this.menuItems.find((item) => {
      return item.role.some((itemRole) => role.includes(itemRole));
    });
  }
}
