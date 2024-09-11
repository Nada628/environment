import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicPieChartComponent } from '@shared/components/charts/dynamic-pie-chart/dynamic-pie-chart.component';
import { StatisticsChartCardComponent } from '@shared/components/cards/statistics-chart-card/statistics-chart-card.component';

@Component({
  selector: 'app-statistics-chart-section',
  standalone: true,
  imports: [
    CommonModule,
    DynamicPieChartComponent,
    StatisticsChartCardComponent,
  ],
  templateUrl: './statistics-chart-section.component.html',
  styleUrl: './statistics-chart-section.component.scss',
})
export class StatisticsChartSectionComponent {
  @Input() chartCardsArr;
}
