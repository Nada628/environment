import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SubtitleComponent } from '../../../../shared/components/subtitle/subtitle.component';
import { FilterComponent } from '../../../components/filter/filter.component';
import { SearchComponent } from '../../../components/search/search.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import {FormGroup,ReactiveFormsModule,FormBuilder,Validators} from '@angular/forms';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { SharedModule } from '@shared/shared.module';
import { RolesApiService } from '@shared/services/roles.service';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'app-roles',
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
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent implements OnInit {
  formGroup!: FormGroup;
  id!: string; 

  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  headers;
  tableData: any[];
  constructor(
    private route: ActivatedRoute,
    private rolesService: RolesApiService,
    private router: Router 
    
  ) {
    this.headers = this.rolesService.tableHeader;
  }
  ngOnInit() {
    this.rolesService.getAll().subscribe((res) => {
      this.tableData = [];

      for (let i = 0; i < (res['data'] as []).length; i++) {
        this.tableData.push({
          serialNumber: i + 1, 
          role: res['data'][i].name, 
          id: res['data'][i].id, 
        });
      }

      this.getTable(); 
    });
  }

  getTable() {
    const headers = this.headers.headers.map(
      (header, i) => ({
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

  openAddUserForm() {
    this.router.navigate(['operations/addRole']);
  }

  handleButtonClick(event: any) {
    console.log('Button clicked:', event);
    console.log('Event Row:', event.row); 

    if (event && event.row) {
      const roleId = event.row.id; 
      if (roleId) {
        this.router.navigate(['operations/editRole', roleId]).then((success) => {
          if (success) {
            console.log('Navigation successful to:', `operations/editRole/${roleId}`);
          } else {
            console.error('Navigation failed.');
          }
        }).catch((err) => {
          console.error('Navigation error:', err);
        });
      } else {
        console.error('Role ID is missing in event.row.');
      }
    } else {
      console.error('Event row is missing or invalid.');
    }
  }
}