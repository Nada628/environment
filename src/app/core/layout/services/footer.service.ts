import { Injectable } from '@angular/core';
import { FooterItem } from '../models/footerItem';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  menuItems: FooterItem[];

  constructor() {
    this.menuItems = [
      {
        title: 'services.services',
        listOfItems: [
          { title: 'services.s1', route: '/main/services/1' },
          { title: 'services.s2', route: '/main/services/2' },
          { title: 'services.s3', route: '/main/services/3' },
          { title: 'services.s4', route: '/main/services/4' },
        ],
      },
      {
        title: 'user.userAccount',
        listOfItems: [
          { title: 'user.login', route: '' },
          { title: 'user.register', route: '' },
        ],
      },
      {
        title: 'routingHeader.about-us',
        listOfItems: [{ title: 'routingHeader.about-us', route: '/main/aboutUs' }],
      },
      {
        title: 'socialMedia.socialMedia',
        listOfItems: [
          { title: 'socialMedia.facebook', route: '', icon: 'bi-facebook' },
          { title: 'socialMedia.twitter', route: '', icon: 'bi-twitter' },
          { title: 'socialMedia.youtube', route: '', icon: 'bi-youtube' },
          { title: 'socialMedia.instagram', route: '', icon: 'bi-instagram' },
        ],
      },
    ];
  }
}
