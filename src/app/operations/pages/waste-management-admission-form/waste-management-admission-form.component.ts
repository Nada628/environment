import { WasteManagementAdmissionFormService } from './../../services/waste-management-admission-form.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';

@Component({
  selector: 'app-waste-management-admission-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    DynamicFormComponent,
    RdfFormComponent,
    ReviewerFormComponent,
  ],
  templateUrl: './waste-management-admission-form.component.html',
  styleUrl: './waste-management-admission-form.component.scss',
})
export class WasteManagementAdmissionFormComponent {
  customerData;
  reviewer: string = 'مصطفى محمد';
  reviewersList;
  statusArr;
  statusNote;

  constructor(
    private wasteManagementAdmissionFormService: WasteManagementAdmissionFormService
  ) {
    this.customerData = this.wasteManagementAdmissionFormService.customerData;
    this.reviewersList = this.wasteManagementAdmissionFormService.reviewersList;
    this.statusArr = this.wasteManagementAdmissionFormService.statusArr;
    this.statusNote = this.wasteManagementAdmissionFormService.statusNote;
  }
}
