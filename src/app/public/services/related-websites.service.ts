import { Injectable } from '@angular/core';
import { CardData } from '@shared/model/card-data.model';

@Injectable({
  providedIn: 'root',
})
export class RelatedWebsitesService {
  relatedWebsitesCards: CardData[];
  constructor() {
    this.relatedWebsitesCards = [
      {
        title: 'relatedWebsites.firstCard.title',
        description: 'relatedWebsites.firstCard.description',
        url: '',
      },
      {
        title: 'relatedWebsites.secondCard.title',
        description: 'relatedWebsites.secondCard.description',
        url: '',
      },
      {
        title: 'relatedWebsites.thirdCard.title',
        description: 'relatedWebsites.thirdCard.description',
        url: '',
      },
      {
        title: 'relatedWebsites.fourthCard.title',
        description: 'relatedWebsites.fourthCard.description',
        url: '',
      },
    ];
  }
}
