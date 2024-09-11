import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { DigitalSealingSubmitionComponent } from '../digital-sealing-submition/digital-sealing-submition.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { ChangeHarborService } from '@operations/services/change-harbor/change-harbor.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { AdmissionFormUtilitiesService } from '@operations/services/admission-form/admission-form-utilities.service';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';

@Component({
  selector: 'app-change-harbor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicFormComponent,
    SubtitleComponent,
    DigitalSealingSubmitionComponent,
    TranslateModule,
    ReviewerFormComponent,
  ],
  templateUrl: './change-harbor.component.html',
  styleUrl: './change-harbor.component.scss',
})
export class ChangeHarborComponent implements OnInit {
  changeHarborForm;
  customerRequestData;
  model;
  formType;
  requestId;
  mainNote;
  showReview;
  statusArr;
  constructor(
    private changeHarborService: ChangeHarborService,
    private activeRoute: ActivatedRoute,
    private auth: AuthService,
    private admissionFormUtilitiesService: AdmissionFormUtilitiesService,
    private requestSubmittedService: RequestSubmittedService
  ) {}
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.formType = params['formType'];
      this.requestId = params['id'];

      this.mainNote = this.changeHarborService.mainNote;
      this.statusArr = this.changeHarborService.statusArr;
      if (this.requestId) {
        this.getRequestById(this.requestId);
      } else {
        this.getRequestList();
      }
    });
    this.showReview = this.auth.appUser.sub?.administrativeId != null;
  }
  navigateToExpense(id: number) {}
  onSubmit() {}
  getRequestById(id: number) {}
  getRequestList() {
    this.admissionFormUtilitiesService.getHarborList().subscribe((res) => {
      let list = res['content'];
      this.model = {
        ...this.model,
        exportHarborList: list,
      };
      this.getCustomerRequest();
    });
  }
  getCustomerRequest() {
    this.requestSubmittedService.getCustomerRequests().subscribe((res) => {
      let list = [];
      (res as any).forEach((element) => {
        list.push({
          name: element.requestType.name + `-${element.id}`,
          id: element.id,
        });
      });
      this.model = {
        ...this.model,
        requestIds: list,
      };
      this.model = this.changeHarborService.initForm(this.model);
    });
  }
}
