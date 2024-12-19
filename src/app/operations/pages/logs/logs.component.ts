import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SubtitleComponent } from '../../../shared/components/subtitle/subtitle.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { SearchComponent } from '../../components/search/search.component';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { SharedModule } from '@shared/shared.module';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { LogsApiService } from '@shared/services/logs.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    NgxPaginationModule,
    SearchBarComponent,
    DynamicFormComponent,
    SubmitButtonComponent,
    ReactiveFormsModule,
    DynamicTableComponent,
    BtnDropdownComponent,
    FilterComponent,
    SearchComponent,
  ],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  formGroup!: FormGroup;

  @ViewChild(DynamicTableComponent, { static: false })
  dynamicTableWrapper!: DynamicTableComponent;
  tableData: any[] = [];
  pagedTableData: any[] = [];
  page: number = 1;
  itemsPerPage: number = 30; // Updated to 30 rows per page
  headers: TableHeader[] = [];

  constructor(
    private logsService: LogsApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.logsService.getLogs().subscribe(
      (res) => {
        if (res.success) {
          this.tableData = res.data.map((log: any, index: number) => ({
            serialNumber: index + 1,
            managerName: log.manager_name ?? '--',
            employeeName: log.employee_name ?? '--',
            desc: log.desc,
            // ipAddress: log.ip_address,
            macAddress: log.mac_address,
            date:log.date,
            // context: log.context ?? 'N/A',
            // entityType: log.entity_type ?? 'N/A',
          }));
          this.setHeaders();
          this.getTable();
        } else {
          console.error('Failed to fetch logs:', res);
        }
      },
      (error) => {
        console.error('Error fetching logs:', error);
      }
    );
  }
  updateTableData() {
    const start = (this.page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedTableData = this.tableData.slice(start, end);
  }

  pageChanged(newPage: number) {
    this.page = newPage;
    this.updateTableData();
  }

  nextPage() {
    if (this.page < Math.ceil(this.tableData.length / this.itemsPerPage)) {
      this.page++;
      this.updateTableData();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.updateTableData();
    }
  }

    // Use a getter for total pages
    get totalPages(): number {
      return Math.ceil(this.tableData.length / this.itemsPerPage);
    }
  setHeaders() {
    this.headers = [
        { key: 'serialNumber', translatedKey: 'tableHeader.serialNumber', index: 0, isSelected: true },
        { key: 'managerName', translatedKey: 'tableHeader.managerName', index: 1, isSelected: true },
        { key: 'employeeName', translatedKey: 'tableHeader.employeeName', index: 2, isSelected: true },
        { key: 'desc', translatedKey: 'tableHeader.desc', index: 3, isSelected: true},
        // { key: 'ipAddress', translatedKey: 'tableHeader.ipAddress', index: 4, isSelected: true },
        { key: 'macAddress', translatedKey: 'tableHeader.macAddress', index: 5, isSelected: true },
        { key: 'date', translatedKey: 'tableHeader.date', index: 8, isSelected: true },

        // { key: 'context', translatedKey: 'tableHeader.context', index: 6, isSelected: true },
        // { key: 'entityType', translatedKey: 'tableHeader.entityType', index: 7, isSelected: true }
      ];
      
  }

  getTable() {
    if (this.headers.length > 0 && this.tableData.length > 0) {
      this.dynamicTableWrapper.render(this.headers, this.tableData);
    } else {
      console.error('Headers or table data is empty.');
    }
  }
}
