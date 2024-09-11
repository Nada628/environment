import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DynamicTableComponent } from '@shared/components/dynamic-table/dynamic-table.component';
import { AdminApiService } from '@admin/services/admin-api.service';
import {
  Adminstration,
  AdminstrationResponse,
} from '@admin/models/adminstrations.model';
import { AdminUtilitiesService } from '@admin/services/admin-utils.service';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { tap, finalize } from 'rxjs/operators';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-table-wrapper',
  templateUrl: './dynamic-table-wrapper.component.html',
  styleUrl: './dynamic-table-wrapper.component.scss',
})
export class DynamicTableWrapper implements OnInit, AfterViewInit {
  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;

  tableData: Adminstration[];
  headers: string[];
  tableName: string;

  constructor(
    private adminAPI: AdminApiService,
    private adminUtilsService: AdminUtilitiesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dynamicTableWrapper.buttonClick.subscribe((event) => {
      this.openDialog(event.row, event.key);
    });

    //Render table based on selectedTable service
    this.adminUtilsService.selectedTable.subscribe((table) => {
      if (table) {
        this.tableName = table.name;
        this.headers = table.headers;
        //Update table data based on selectedTable -- API Request
        this.updateTableData();
      }
    });
  }

  updateTableData() {
    if (this.tableName && this.headers && this.dynamicTableWrapper) {
      this.adminAPI
        .getData(this.tableName)
        .pipe(
          tap((data: AdminstrationResponse) => {
            // Update tableData on successful API call
            this.tableData = data.content;
          }),
          finalize(() => {
            // Render table regardless of success/failure of API call
            const headers = this.headers.map(
              (header, i) =>
                ({
                  key: header.substring(12),
                  translatedKey: header,
                  index: i,
                  isSelected: true,
                } as TableHeader)
            );
            this.dynamicTableWrapper.render(headers, this.tableData);
          })
        )
        .subscribe(
          () => {},
          (error) => {
            this.tableData = []; // Set default
          }
        );
    }
  }

  openDialog(row, option) {
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      panelClass: 'custom-container',
      data: {
        row: row,
        option: option,
        selectedTable: this.tableName,
        selectedForm: this.adminUtilsService.getEditForm(this.tableName, row),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action) {
        switch (result.action) {
          case 'edit':
            this.adminAPI
              .editData(this.tableName, result.data, row.id)
              .subscribe((response) => {
                this.updateTableData();
              });
            break;
          case 'delete':
            this.adminAPI
              .deleteData(this.tableName, row.id)
              .subscribe((response) => {
                this.updateTableData();
              });
            break;
          default:
            break;
        }
      }
    });
  }
}
