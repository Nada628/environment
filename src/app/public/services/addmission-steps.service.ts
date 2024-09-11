import { Injectable } from '@angular/core';
import { CardData } from '@shared/model/card-data.model';

@Injectable({
  providedIn: 'root',
})
export class AdmissionStepsService {
  admissionStepsItems: CardData[];
  constructor() {
    this.admissionStepsItems = [
      {
        title: 'admissionSteps.cards.firstCard.title',
        description: 'admissionSteps.cards.firstCard.description',
        url: '../../../../../assets/images/landing page – 1/device-protected-by-cyber-security.png',
      },
      {
        title: 'admissionSteps.cards.secondCard.title',
        description: 'admissionSteps.cards.secondCard.description',
        url: '../../../../../assets/images/landing page – 1/hand-using-laptop-computer-with-virtual-screen-document-online-approve-paperless-quality-assurance-erp-management-concept.png',
      },
      {
        title: 'admissionSteps.cards.thirdCard.title',
        description: 'admissionSteps.cards.thirdCard.description',
        url: '../../../../../assets/images/landing page – 1/hand-with-card-laptop.png',
      },
      {
        title: 'admissionSteps.cards.fourthCard.title',
        description: 'admissionSteps.cards.fourthCard.description',
        url: '../../../../../assets/images/landing page – 1/standard-quality-control-concept-m.png',
      },
    ];
  }
}
