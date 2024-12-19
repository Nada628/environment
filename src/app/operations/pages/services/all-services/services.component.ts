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
import { ServiceApiService } from '@shared/services/services.service';
import { TableHeader } from '@shared/model/dynamic-table.model';
import { ActivatedRoute, Router } from '@angular/router'; 
import {DepartmentsApiService} from'@shared/services/departments.service';

@Component({
  selector: 'app-services',
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
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServiceComponent implements OnInit {
  formGroup!: FormGroup;
  id!: string; // Declare 'id' property

  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper: DynamicTableComponent;
  headers;
  tableData: any[];
  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceApiService,
    private departmentsService: DepartmentsApiService,
    private router: Router 
    
  ) {
    this.headers = this.serviceService.tableHeader;
  }
  ngOnInit() {
    this.serviceService.getDepartments().subscribe((departmentsRes) => {
      const departments = departmentsRes['data']; 
      
      const departmentMap = departments.reduce((map: any, department: any) => {
        map[department.id] = department.name;
        return map;
      }, {});
  
      this.serviceService.getAll().subscribe((servicesRes) => {
        this.tableData = servicesRes['data'].map((service: any, index: number) => ({
          serialNumber: index + 1,
          service: service.title,
          departmentName: departmentMap[service.department_id] || 'Unknown', 
          desc: service.description,
          cost:service.cost,
          id: service.id,
        }));
          this.getTable();
      });
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
    this.router.navigate(['operations/addService']); 
  }

  handleButtonClick(event: any) {
    console.log('Button clicked:', event);
    if (event && event.row && event.row.id) {
      this.router.navigate([
        'operations/editService',
        event.row.id
      ]).then(success => {
        if (success) {
          console.log('Navigation successful to:', `operations/editService/${event.row.id}`);
        } else {
          console.error('Navigation failed.');
        }
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    } else {
      console.error('Service ID is missing in event.row.');
    }
  }
  
}
