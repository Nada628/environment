import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HarborApiService } from '@shared/services/harbor.service';
import { SubtitleComponent } from '../../../../shared/components/subtitle/subtitle.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';
import { FilterComponent } from '../../../components/filter/filter.component';
import { SearchComponent } from '../../../components/search/search.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-harbors',
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
  templateUrl: './harbors.component.html',
  styleUrls: ['./harbors.component.scss'],
})
export class HarborsComponent implements OnInit {
  formGroup!: FormGroup;
  tableData: any[] = [];
  headers;
  @ViewChild('dynamicTableWrapper', { static: false })
  dynamicTableWrapper!: DynamicTableComponent;

  constructor(
    private route: ActivatedRoute,
    private harborService: HarborApiService,
    private router: Router
  ) {
    this.headers = this.harborService.tableHeader;
  }

  async ngOnInit() {
    try {
      const res = await this.harborService.getAll().toPromise();
      const harborData = res['data'] || [];

      // Map harbor data to fetch country names
      const promises = harborData.map((harbor: any, index: number) => this.fetchHarborData(harbor, index + 1));
      this.tableData = await Promise.all(promises);
      this.getTable();
    } catch (error) {
      console.error('Error fetching harbors:', error);
    }
  }

  // Fetch harbor data and country name
  private fetchHarborData(harbor: any, serialNumber: number): Promise<any> {
    return this.harborService.getCountryById(harbor.country_id).toPromise()
      .then((countryRes) => {
        return {
          serialNumber,
          harbor: harbor.name,
          code: harbor.code,
          harbor_type: harbor.harbor_type,
          country_id: countryRes?.country?.name || 'Unknown Country',
          id: harbor.id,
        };
      })
      .catch(() => ({
        serialNumber,
        harbor: harbor.name,
        code: harbor.code,
        harbor_type: harbor.harbor_type,
        country_id: 'Unknown Country',
        id: harbor.id,
      }));
  }

  getTable() {
    const headers = this.headers.headers.map((header, i) => ({
      key: header.substring(12),
      translatedKey: header,
      index: i,
      isSelected: true,
    }));

    if (this.tableData?.length > 0) {
      this.dynamicTableWrapper.render(headers, this.tableData);
    }
  }

  openAddForm() {
    this.router.navigate(['operations/addHarbor']);
  }

  handleButtonClick(event: any) {
    if (event?.row?.id) {
      this.router.navigate(['operations/editHarbor', event.row.id]);
    }
  }
}
