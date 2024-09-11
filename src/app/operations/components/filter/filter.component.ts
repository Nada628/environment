import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { DropDownItem } from '@shared/model/dropDown.model';
import { BtnDropdownComponent } from '@shared/components/buttons/btn-dropdown/btn-dropdown.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, BtnDropdownComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  serviceNameDropDownList: DropDownItem[];
  statusDropDownList: DropDownItem[];

  constructor(private requestSubmittedService: RequestSubmittedService) {
    this.serviceNameDropDownList =
      this.requestSubmittedService.serviceNameDropDownList;
    this.statusDropDownList = this.requestSubmittedService.statusDropDownList;
  }
}
