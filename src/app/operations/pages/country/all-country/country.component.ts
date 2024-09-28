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
import { CountryApiService } from '@shared/services/country.service';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-country',
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
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  formGroup!: FormGroup;
  id!: string;

  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  headers;
  tableData: any[];
  constructor(
    private route: ActivatedRoute,
    private coutryService: CountryApiService,
    private router: Router 
    
  ) {
    this.headers = this.coutryService.tableHeader;
  }
  ngOnInit() {
    this.coutryService.getCountry().subscribe((res) => {
      this.tableData = [];

      for (let i = 0; i < (res['countries'] as []).length; i++) {
        this.tableData.push({
          serialNumber: i + 1, 
          country: res['countries'][i].name,
          notes: res['countries'][i].description,
          id: res['countries'][i].id, 
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


  openAddCoutryForm() {
    this.router.navigate(['operations/addCountry']) 
  }

  handleButtonClick(event: any) {
    console.log('Button clicked:', event);

    if (event && event.row && event.row.id) {
      this.router.navigate([
        'operations/editCountry',
        event.row.id
      ]).then(success => {
        if (success) {
          console.log('Navigation successful to:', `operations/editCountry/${event.row.id}`);
        } else {
          console.error('Navigation failed.');
        }
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    } else {
      console.error('city ID is missing in event.row.');
    }
  }
  
}
