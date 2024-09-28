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
import { CompanyActivityApiService } from '@shared/services/company-activity.service';

@Component({
  selector: 'app-company-activity',
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
  templateUrl: './company-activity.component.html',
  styleUrl: './company-activity.component.scss',
})
export class CompanyActivityComponent implements OnInit {
  formGroup!: FormGroup;
  id!: string;

  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  headers;
  tableData: any[];
  constructor(
    private route: ActivatedRoute,
    private companyActivityService: CompanyActivityApiService,
    private router: Router 
    
  ) {
    this.headers = this.companyActivityService.tableHeader;
  }
  ngOnInit() {
    this.companyActivityService.getAll().subscribe((res) => {
      this.tableData = [];

      for (let i = 0; i < (res['company_activities'] as []).length; i++) {
        this.tableData.push({
          serialNumber: i + 1, 
          activity: res['company_activities'][i].name,
          desc: res['company_activities'][i].description,
          company_type_name: res['company_activities'][i].company_type_name,
          id: res['company_activities'][i].id, 
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
    this.router.navigate(['operations/addCompanyActivity']) 
  }

  handleButtonClick(event: any) {
    console.log('Button clicked:', event);

    if (event && event.row && event.row.id) {
      this.router.navigate([
        'operations/editCompanyActivity',
        event.row.id
      ]).then(success => {
        if (success) {
          console.log('Navigation successful to:', `operations/editCompanyActivity/${event.row.id}`);
        } else {
          console.error('Navigation failed.');
        }
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    } else {
      console.error('Company activity ID is missing in event.row.');
    }
  }
  
}
