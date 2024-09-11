import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { TranslateModule } from '@ngx-translate/core';
import { FilterComponent } from '@operations/components/filter/filter.component';
import { SearchComponent } from '@operations/components/search/search.component';
import { DynamicTableComponent } from '@shared/components/dynamic-table/dynamic-table.component';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { TableService } from '@shared/services/table.service';
import { DynamicPieChartComponent } from '@shared/components/charts/dynamic-pie-chart/dynamic-pie-chart.component';
import { ReportsService } from '@operations/services/reports.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    SubtitleComponent,
    TranslateModule,
    FilterComponent,
    SearchComponent,
    DynamicTableComponent,
    DynamicPieChartComponent,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  @ViewChild('reportsData', { static: false })
  reportsData: DynamicTableComponent;
  headers;
  tableData: string[];
  reportHeaders;
  reportsTableData: string[];
  chartData;

  constructor(
    private requestSubmittedService: RequestSubmittedService,
    private tableService: TableService,
    private reportService: ReportsService
  ) {
    this.headers = this.requestSubmittedService.tableHeader;
    this.tableData = this.requestSubmittedService.tableData;
    this.reportHeaders = this.reportService.reportsTableHeader;
    this.reportsTableData = this.reportService.reportsTableData;
    this.chartData = reportService.chartData;
  }

  ngAfterViewInit() {
    const tableHeaders = this.tableService.initTableHeaders(this.headers);
    const reportTableHeaders = this.tableService.initTableHeaders(
      this.reportHeaders
    );
    this.dynamicTableWrapper.render(tableHeaders, this.tableData);
    this.reportsData.render(reportTableHeaders, this.reportsTableData);
  }
}
