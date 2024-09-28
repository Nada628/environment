import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SubtitleComponent } from '../../../../shared/components/subtitle/subtitle.component';
import { FilterComponent } from '../../../components/filter/filter.component';
import { SearchComponent } from '../../../components/search/search.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import {FormGroup,ReactiveFormsModule,FormBuilder,Validators,} from '@angular/forms';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { SharedModule } from '@shared/shared.module';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { ActivatedRoute, Router } from '@angular/router'; 
import { UnLoadTypeApiService } from '@shared/services/unload-type.service';

@Component({
  selector: 'app-unload-type',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    SearchBarComponent,
    DynamicFormComponent,
    SubmitButtonComponent,
    ReactiveFormsModule,
    DynamicTableComponent,
    BtnDropdownComponent,
    FilterComponent,
    SearchComponent,
  ],
  templateUrl: './unload-type.component.html',
  styleUrl: './unload-type.component.scss',
})
export class UnLoadTypeComponent implements OnInit {
  formGroup!: FormGroup;
  id!: string;

  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  headers;
  tableData: any[];
  constructor(
    private route: ActivatedRoute,
    private unloadTypeService: UnLoadTypeApiService,
    private router: Router 
    
  ) {
    this.headers = this.unloadTypeService.tableHeader;
  }
  ngOnInit() {
    this.unloadTypeService.getAll().subscribe((res) => {
      this.tableData = [];

      for (let i = 0; i < (res['data'] as []).length; i++) {
        this.tableData.push({
          serialNumber: i + 1, 
          unloadType: res['data'][i].name,
          notes: res['data'][i].desc,
          price: res['data'][i].price,
          form_type: res['data'][i].form_type,
          id: res['data'][i].id, 
        });
      }
      this.getTable();
    });
  }
  getTable() {
    const headers = this.headers.headers.map(
      (header, i) =>
        ({
          key: header.substring(12),
          translatedKey: header,
          index: i,
          isSelected: true,
        } as TableHeader)
    );

    if (this.tableData?.length > 0) {
      this.dynamicTableWrapper.render(headers, this.tableData);
    }
  }


  openAddForm() {
    this.router.navigate(['operations/AddUnloadType']) 
  }

  handleButtonClick(event: any) {
    console.log('Button clicked:', event);

    if (event && event.row && event.row.id) {
      this.router.navigate([
        'operations/editUnLoadType',
        event.row.id
      ]).then(success => {
        if (success) {
          console.log('Navigation successful to:', `operations/editUnLoadType/${event.row.id}`);
        } else {
          console.error('Navigation failed.');
        }
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    } else {
      console.error('unload type ID is missing in event.row.');
    }
  }
  
}
