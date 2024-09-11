import { Injectable } from '@angular/core';
import { GovernmentalLinks } from '@public/models/governmental-links.model';

@Injectable({
  providedIn: 'root',
})
export class GovernmentalWebsitesService {
  links: GovernmentalLinks[];
  constructor() {
    this.links = [
      {
        path: '',
        imgSrc:
          '../../../../../assets/images/landing page – 1/2022082716333368.png',
      },
      {
        path: '',
        imgSrc:
          '../../../../../assets/images/landing page – 1/20220827163332938.png',
      },
      {
        path: '',
        imgSrc:
          '../../../../../assets/images/landing page – 1/20220830131006875.png',
      },
      {
        path: '',
        imgSrc:
          '../../../../../assets/images/landing page – 1/20220830132907491.png',
      },
    ];
  }
}
