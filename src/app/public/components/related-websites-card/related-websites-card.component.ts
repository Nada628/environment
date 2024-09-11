import { Component, Input } from '@angular/core';
import { CardData } from '../../../shared/model/card-data.model';

@Component({
  selector: 'app-related-websites-card',
  templateUrl: './related-websites-card.component.html',
  styleUrl: './related-websites-card.component.scss',
})
export class RelatedWebsitesCardComponent {
  @Input() card: CardData;
}
