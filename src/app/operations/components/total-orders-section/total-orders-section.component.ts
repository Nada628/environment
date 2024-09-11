import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TotalRequestsCardComponent } from '@shared/components/cards/total-requests-card/total-requests-card.component';
import { TotalSectionComponent } from '../total-section/total-section.component';
import { TotalRequestsCard, totalCard } from '@shared/model/card-data.model';

@Component({
  selector: 'app-total-orders-section',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TotalRequestsCardComponent,
    TotalSectionComponent,
  ],
  templateUrl: './total-orders-section.component.html',
  styleUrl: './total-orders-section.component.scss',
})
export class TotalOrdersSectionComponent {
  @Input() totalRequestsCards: TotalRequestsCard[];
  @Input() totals: totalCard[];
}
