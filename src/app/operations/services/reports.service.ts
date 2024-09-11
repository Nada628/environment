import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  reportsTableHeader;
  reportsTableData;

  chartData;
  constructor() {
    this.chartData = {
      chardData: {
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: ['#0070C4', '#DFB50B', '#FF0000'],
            hoverOffset: 4,
          },
        ],
      },
    };

    this.reportsTableHeader = {
      name: 'reportsHeader',
      headers: [
        'tableHeader.accepted',
        'tableHeader.underReview',
        'tableHeader.rejected',
      ],
    };
    this.reportsTableData = [
      {
        accepted: 700,
        underReview: 500,
        rejected: 200,
      },
    ];
  }
}
