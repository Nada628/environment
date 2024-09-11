import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart, { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-dynamic-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-pie-chart.component.html',
  styleUrl: './dynamic-pie-chart.component.scss',
})
export class DynamicPieChartComponent {
  @ViewChild('chart', { static: true }) private chartElementRef;
  @Input() data;
  chart: any = [];
  title = 'ng-chart';

  constructor() {}

  ngOnInit() {
    let context = this.chartElementRef.nativeElement;
    let chartData: ChartConfiguration = {
      type: 'pie',
      data: this.data,
    };
    this.chart = new Chart(context, chartData);
  }
}
