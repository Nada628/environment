import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SubtitleComponent } from '../../../../shared/components/subtitle/subtitle.component';
import { FilterComponent } from '../../../components/filter/filter.component';
import { SearchComponent } from '../../../components/search/search.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { SharedModule } from '@shared/shared.module';
import { SubDepartmentsApiService } from '@shared/services/sub-departments.service';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-sub-departments',
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
  templateUrl: './sub-departments.component.html',
  styleUrl: './sub-departments.component.scss',
})
export class SubDepartmentsComponent implements OnInit {
  formGroup!: FormGroup;

  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  headers;
  tableData: any[];
  constructor(
    private subDepartmentService: SubDepartmentsApiService,
    private router: Router 
  ) {
    this.headers = this.subDepartmentService.tableHeader;
  }
  ngOnInit() {
    this.subDepartmentService.getAll().subscribe((res) => {
      this.tableData = [];

      for (let i = 0; i < (res['data'] as []).length; i++) {
        this.tableData.push({
          serialNumber: i + 1, 
          subDepartmentName: res['data'][i].name,
          mainDepartment: res['data'][i].department_name,
          departmentDescription: res['data'][i].description,
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

 
  openAddDepartmentForm() {
    this.router.navigate(['operations/AddSubDepartment']); 
  }

  handleButtonClick(event: any) {
    console.log('Button clicked:', event);

    if (event && event.row && event.row.id) {
      this.router.navigate([
        'operations/editSubDepartment',
        event.row.id
      ]).then(success => {
        if (success) {
          console.log('Navigation successful to:', `operations/editSubDepartment/${event.row.id}`);
        } else {
          console.error('Navigation failed.');
        }
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    } else {
      console.error('Sub department ID is missing in event.row.');
    }
  }
}
