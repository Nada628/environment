import { Injectable } from '@angular/core';
import { ContactUsDetails } from '@public/models/contact-us.model';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  contactUsDetails: ContactUsDetails[];

  constructor() {
    this.contactUsDetails = [
      {
        title: 'contactUs.address',
        description: 'contactUs.addressDescription',
        i: 'bi-house-door',
      },
      {
        title: 'contactUs.tel',
        description: '25256452 (202)',
        i: 'bi-telephone',
      },
      {
        title: 'contactUs.fax',
        description: '25256490 (202)',
        i: 'bi-phone-landscape',
      },
      {
        title: 'contactUs.hotLine',
        description: '19808',
        i: 'bi-headphones',
      },
      {
        title: 'contactUs.customerService',
        description: '25266178 - 25256470',
        i: 'bi-person-circle',
      },
      {
        title: 'contactUs.reports',
        description: '01222693333',
        i: 'bi-whatsapp',
      },
      {
        title: 'contactUs.email',
        description: 'eeaa@moenv.gov.eg',
        i: 'bi-envelope',
      },
      {
        title: 'contactUs.postNumber',
        description: '11728',
        i: 'bi-envelope-open',
      },
    ];
  }
}
