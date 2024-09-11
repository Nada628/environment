import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachedDocumentsComponent } from '@operations/components/attached-documents/attached-documents.component';
import { DigitalSealingFormComponent } from '@operations/components/digital-sealing-form/digital-sealing-form.component';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { OperationsApiService } from '@operations/services/operations.api.service';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accept-form-coal-plant-normal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
    AttachedDocumentsComponent,
    DigitalSealingFormComponent,
    SubmitButtonComponent,
    SubtitleComponent,
    RdfFormComponent,
    ReviewerFormComponent,
  ],
  templateUrl: './accept-form-coal-plant-normal.component.html',
  styleUrl: './accept-form-coal-plant-normal.component.scss',
})
export class AcceptFormCoalPlantNormalComponent {
  requestId;
  plantRequest;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestSubmittedService: RequestSubmittedService,
    private operationsApiService: OperationsApiService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      this.requestId = params['requestId'];
      this.requestSubmittedService
        .getCustomerRequestById(this.requestId)
        .subscribe((res) => {
          this.plantRequest = res['content'];
        });
    });
  }
  print() {
    window.print();
  }
  changeStatus() {
    this.operationsApiService
      .updateRequestStatus(this.requestId, 'AcceptFormT')
      .subscribe((x) => {
        this.toastr.success('Status Submitted Successfully');
        this.router.navigateByUrl('operations/requestsSubmitted');
      });
  }
}
