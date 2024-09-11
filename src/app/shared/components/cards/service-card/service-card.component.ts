import { Component, Input } from '@angular/core';
import { ServiceCard } from '@shared/model/card-data.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss',
})
export class ServiceCardComponent {
  @Input() cardData: ServiceCard;
  hover: boolean;
}
