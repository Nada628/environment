import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { totalCard } from '@shared/model/card-data.model';

@Component({
  selector: 'app-total-section',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './total-section.component.html',
  styleUrl: './total-section.component.scss',
})
export class TotalSectionComponent {
  @Input() total: totalCard;
}
