import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TableHeader } from '@shared/model/dynamic-table.model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor() {}

  initTableHeaders(headers) {
    let tableHeaders = headers.headers.map(
      (header, i) =>
        ({
          key: header.substring(12),
          translatedKey: header,
          index: i,
          isSelected: true,
        } as TableHeader)
    );
    return tableHeaders;
  }
}
