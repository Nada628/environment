import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SubtitleComponent } from '../../../shared/components/subtitle/subtitle.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { SearchComponent } from '../../components/search/search.component';
import { DynamicTableComponent } from '../../../shared/components/dynamic-table/dynamic-table.component';
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
import { DepartmentsApiService } from '@shared/services/departments.service';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-departments',
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
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
})
export class DepartmentsComponent implements OnInit {
  formGroup!: FormGroup;

  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  headers;
  tableData: any[];
  constructor(
    private departmentService: DepartmentsApiService,
    private router: Router // Inject Router here
  ) {
    this.headers = this.departmentService.tableHeader;
  }
  ngOnInit() {
    this.departmentService.getDepartments().subscribe((res) => {
      this.tableData = [];

      for (let i = 0; i < (res['data'] as []).length; i++) {
        this.tableData.push({
          serialNumber: i + 1, // Adding serial number starting from 1
          departmentName: res['data'][i].name,
          departmentNumber: res['data'][i]['id'],
          departmentDescription: res['data'][i].description,
          createDate: this.formatDate(res['data'][i]['created_at']),
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() returns month from 0-11
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // pad minutes to ensure two digits

    // return `${day}/${month}/${year} at ${hours}:${minutes}`;
    return `${day}/${month}/${year}`;
  }
  openAddDepartmentForm() {
    this.router.navigate(['operations/addDepartment']); // Navigate to the new component
  }

  handleButtonClick(event: any) {
    console.log('Navigating to edit department with ID:');
    this.router.navigate([
      'operations/editDepartment/',
      event.row.departmentNumber,
    ]);
  }
}
