import { Injectable } from '@angular/core';
import { ServiceCard } from '@shared/model/card-data.model';
import { AuthService } from 'app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceSectionService {
  cardsData: ServiceCard[];

  constructor(private auth: AuthService) {
    this.auth.isLoggedInSubject$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        if (this.auth.companyStatus.is_trending) {
          this.cardsData = [
            {
              title: 'services.firstCard.title',
              description: 'services.firstCard.description',
              url: '../../../../../assets/images/landing page – 1/clipboard (1).png',
              urlHover:
                '../../../../../assets/images/landing page – 1/clipboard.png',
              path: '/operations/requestForm/add/new',
            },
          ];
        } else {
          this.cardsData = [
            {
              title: 'services.firstCard.title',
              description: 'services.firstCard.description',
              url: '../../../../../assets/images/landing page – 1/clipboard (1).png',
              urlHover:
                '../../../../../assets/images/landing page – 1/clipboard.png',
              path: '/operations/requestForm/add/new',
            },
            {
              title: 'services.secondCard.title',
              description: 'services.secondCard.description',
              url: '../../../../../assets/images/landing page – 1/report.png',
              urlHover:
                '../../../../../assets/images/landing page – 1/report.png',
              path: '/operations',
            },
          ];
        }
      } else {
        this.cardsData = [
          {
            title: 'services.firstCard.title',
            description: 'services.firstCard.description',
            url: '../../../../../assets/images/landing page – 1/clipboard (1).png',
            urlHover:
              '../../../../../assets/images/landing page – 1/clipboard.png',
            path: '/operations/requestForm/add/new',
          },
          {
            title: 'services.secondCard.title',
            description: 'services.secondCard.description',
            url: '../../../../../assets/images/landing page – 1/report.png',
            urlHover:
              '../../../../../assets/images/landing page – 1/report.png',
            path: '/operations',
          },
          {
            title: 'services.thirdCard.title',
            description: 'services.thirdCard.description',
            url: '../../../../../assets/images/landing page – 1/clipboard (1).png',
            urlHover:
              '../../../../../assets/images/landing page – 1/clipboard.png',
            path: '/operations/requestForm/add/new',
          },
          {
            title: 'services.fourthCard.title',
            description: 'services.fourthCard.description',
            url: '../../../../../assets/images/landing page – 1/report.png',
            urlHover:
              '../../../../../assets/images/landing page – 1/report.png',
            path: '/operations',
          },
          {
            title: 'services.fifthCard.title',
            description: 'services.fifthCard.description',
            url: '../../../../../assets/images/landing page – 1/clipboard (1).png',
            urlHover:
              '../../../../../assets/images/landing page – 1/clipboard.png',
            path: '/operations/requestForm/add/new',
          },
          {
            title: 'services.sixthCard.title',
            description: 'services.sixthCard.description',
            url: '../../../../../assets/images/landing page – 1/report.png',
            urlHover:
              '../../../../../assets/images/landing page – 1/report.png',
            path: '/operations',
          },
        ];
      }
    });
  }
}
