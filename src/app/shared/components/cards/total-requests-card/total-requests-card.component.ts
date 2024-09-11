import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TotalRequestsCard } from '@shared/model/card-data.model';

@Component({
  selector: 'app-total-requests-card',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './total-requests-card.component.html',
  styleUrl: './total-requests-card.component.scss',
})
export class TotalRequestsCardComponent {
  @Input() card: TotalRequestsCard;
}
