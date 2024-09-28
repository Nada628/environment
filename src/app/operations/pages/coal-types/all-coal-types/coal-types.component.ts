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
import { CoalTypesApiService } from '@shared/services/coal-types.service.';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-users',
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
  templateUrl: './coal-types.component.html',
  styleUrl: './coal-types.component.scss',
})
export class CoalTypesComponent implements OnInit {
  formGroup!: FormGroup;
  id!: string;

  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  headers;
  tableData: any[];
  constructor(
    private route: ActivatedRoute,
    private coalTypesService: CoalTypesApiService,
    private router: Router 
    
  ) {
    this.headers = this.coalTypesService.tableHeader;
  }
  ngOnInit() {
    this.coalTypesService.getCoalTypes().subscribe((res) => {
      this.tableData = [];

      for (let i = 0; i < (res['data'] as []).length; i++) {
        this.tableData.push({
          serialNumber: i + 1, 
          name: res['data'][i].name,
          Code: res['data'][i].code,
          ratioPrice: res['data'][i].ratio_price_per_ton,
          departmentName: res['data'][i].department_name,
          subDepartmentName: res['data'][i].sub_department_name || 'null',
          Percentage: res['data'][i].hander_percent,
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


  openAddCoalTypeForm() {
    this.router.navigate(['operations/addCoalType']) 
  }

  handleButtonClick(event: any) {
    console.log('Button clicked:', event);

    if (event && event.row && event.row.id) {
      this.router.navigate([
        'operations/editCoalType',
        event.row.id
      ]).then(success => {
        if (success) {
          console.log('Navigation successful to:', `operations/editCoalType/${event.row.id}`);
        } else {
          console.error('Navigation failed.');
        }
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    } else {
      console.error('User ID is missing in event.row.');
    }
  }
  
}
