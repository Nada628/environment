import { TranslationService } from 'app/language/translation.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicPieChartComponent } from '@shared/components/charts/dynamic-pie-chart/dynamic-pie-chart.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-statistics-chart-card',
  standalone: true,
  imports: [CommonModule, DynamicPieChartComponent, SharedModule],
  templateUrl: './statistics-chart-card.component.html',
  styleUrl: './statistics-chart-card.component.scss',
})
export class StatisticsChartCardComponent {
  @Input() cardData;
  currentLang: string;

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.currentLang;
  }
}
