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
import { UsersApiService } from '@shared/services/users.service';
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
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  formGroup!: FormGroup;
  id!: string; // Declare 'id' property

  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  headers;
  tableData: any[];
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersApiService,
    private router: Router 
    
  ) {
    this.headers = this.usersService.tableHeader;
  }
  ngOnInit() {
    this.usersService.getUsers().subscribe((res) => {
      this.tableData = [];

      for (let i = 0; i < (res['users'] as []).length; i++) {
        this.tableData.push({
          serialNumber: i + 1, 
          name: res['users'][i].name,
          email: res['users'][i].email,
          username: res['users'][i].username,
          departmentName: res['users'][i]['department_name'],
          id: res['users'][i].id, 
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


  openAddUserForm() {
    this.router.navigate(['operations/addUser']); 
  }

  handleButtonClick(event: any) {
    console.log('Button clicked:', event);
    if (event && event.row && event.row.id) {
      this.router.navigate([
        'operations/editUser',
        event.row.id
      ]).then(success => {
        if (success) {
          console.log('Navigation successful to:', `operations/editUser/${event.row.id}`);
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
