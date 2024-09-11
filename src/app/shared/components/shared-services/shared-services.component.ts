import { Component, Input } from '@angular/core';
import { ServiceCard } from '../../model/card-data.model';
import { ServiceSectionService } from '@public/services/service-section.service';

@Component({
  selector: 'app-shared-services',
  templateUrl: './shared-services.component.html',
  styleUrl: './shared-services.component.scss',
})
export class SharedServicesComponent {
  @Input() seeMore: boolean = false;
  cardData: ServiceCard[];

  constructor(private serviceSectionService: ServiceSectionService) {
    this.cardData = this.serviceSectionService.cardsData;
  }
}
