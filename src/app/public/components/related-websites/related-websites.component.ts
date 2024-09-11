import { RelatedWebsitesService } from './../../services/related-websites.service';
import { Component } from '@angular/core';
import { CardData } from '../../../shared/model/card-data.model';

@Component({
  selector: 'app-related-websites',
  templateUrl: './related-websites.component.html',
  styleUrl: './related-websites.component.scss',
})
export class RelatedWebsitesComponent {
  cards: CardData[];
  constructor(private relatedWebsitesService: RelatedWebsitesService) {
    this.cards = this.relatedWebsitesService.relatedWebsitesCards;
  }
}
