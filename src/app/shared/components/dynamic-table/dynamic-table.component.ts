import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
} from '@angular/core';
import { CommonModule} from '@angular/common';
import { DynamicTable, TableHeader } from '@shared/model/dynamic-table.model';
import { BtnComponent } from '../buttons/btn/btn.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { NzPopoverModule } from 'ng-zorro-antd/popover';

enum status {
  accepted = 'Accepted',
  accept = 'Accept',
  underReview = 'UnderReview',
  rejected = 'Rejected',
  CompleteEntry = 'CompleteEntry',
  CorrectEntry = 'CorrectEntry',
  AcceptProtectEEA = 'AcceptProtectEEA',
  AcceptManager = 'AcceptManager',
  Created = 'Created',
  AcceptRDF = 'AcceptRDF',
}
@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    CommonModule,
    BtnComponent,
    TranslateModule,
    RouterModule,
    NzPopoverModule,
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
})
export class DynamicTableComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<any>();
  //Fields
  tableData: DynamicTable;
  allHeaders: TableHeader[];
  status: typeof status = status;
  @Input() headers: any[] = [];
  @Input() data: any[] = [];  //


  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('buttonClick', this.buttonClick);

    this.tableData = { headers: [], data: [] };
  }

  render(headers: TableHeader[], data: any[]) {
    this.tableData = {
      headers: headers,
      data: data,
    };
    this.allHeaders = headers;
    console.log(this.tableData);
    this.changeDetector.detectChanges();
  }


  handleButtonClick(key: string, row: any) {
    console.log('Button clicked:', key, row);
    if (row) {
      this.buttonClick.emit({ key, row }); 
    } else {
      console.error('Row data is undefined');
    }
  }


}
