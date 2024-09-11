import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { DigitalSealingSubmitionComponent } from '../digital-sealing-submition/digital-sealing-submition.component';
import { TranslateModule } from '@ngx-translate/core';
import { PlantCoalServiceService } from '@operations/services/plant-coal-service/plant-coal.service.service';
import { AdmissionFormUtilitiesService } from '@operations/services/admission-form/admission-form-utilities.service';
import { AuthService } from 'app/core/services/auth.service';
import { CompanyApiService } from '@shared/services/company.api.service';
import { DropDownObj } from '@shared/model/dropDown.model';
import { UtilitiesApiService } from '@shared/services/utilities.api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';

@Component({
  selector: 'app-plant-coal',
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
  templateUrl: './plant-coal.component.html',
  styleUrl: './plant-coal.component.scss',
})
export class PlantCoalComponent implements OnInit {
  model: {};
  requestId;
  formType;
  customerRequestData;
  showReview: boolean = false;
  reviewerForm;
  mainNote;
  statusArr;
  @ViewChild('coalPlantForm') coalPlantForm!: ElementRef;
  constructor(
    private plantService: PlantCoalServiceService,
    private admissionFormUtilitiesService: AdmissionFormUtilitiesService,
    private auth: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private companyApiService: CompanyApiService,
    private requestSubmittedService: RequestSubmittedService
  ) {}
  coalValidationForm(form) {
    return form;
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.formType = params['formType'];
      this.requestId = params['id'];
      this.mainNote = this.plantService.mainNote;
      this.statusArr = this.plantService.statusArr;
      if (this.requestId) {
        this.getRequestById(this.requestId);
      } else {
        this.getCoalType();
      }
    });
    this.showReview = this.auth.appUser.sub?.administrativeId != null;
  }
  getCoalType() {
    this.admissionFormUtilitiesService.getPlantCoalType().subscribe((res) => {
      this.model = {
        ...this.model,
        coalTypeList: res['content'],
      };
      this.getArrivedHarbor();
    });
  }
  getArrivedHarbor() {
    this.admissionFormUtilitiesService.getHarborList().subscribe((res) => {
      this.model['exportHarborList'] = res['content'];
      this.model['arriveHarborList'] = res['content'];
      this.getIndustrialNumber();
    });
  }
  getExportHarbor() {
    this.model = this.plantService.initForm(this.model, this.formType);
  }
  getIndustrialNumber() {
    let data: DropDownObj[] = [];

    if (
      this.auth.appUser.sub.administrativeId != null &&
      this.customerRequestData != undefined
    ) {
      this.companyApiService
        .getCompanyById(this.customerRequestData.companyId)
        .subscribe((res) => {
          let company = res['content'];
          data.push({ name: company.industryNumber, id: company.id });

          this.model['industryRecords'] = data;
          this.getExportHarbor();
        });
    } else {
      this.companyApiService
        .getCompanyByOwnerId(this.auth.userId)
        .subscribe((res) => {
          let companies = res['content'];
          companies?.forEach((co) => {
            data.push({ name: co.industryNumber, id: co.id });
          });

          this.model['industryRecords'] = data;
          this.getExportHarbor();
        });
    }
  }

  onSubmit() {
    // let formData = this.coalPlantForm['dynamicFormGroup'];
    // let detailList :RequestDetail[] = [];
    // detailList.push(formData.value);
    // detailList[0].harborIds = [formData.value?.harborIds];
    // detailList[0].otherAttachment = [formData.value?.otherAttachment];
    // let formFileData = new FormData();
    // formFileData.append('files', formData.value.otherAttachment[0], formData.value.otherAttachment.name);
    // this.utilitiesApiService.uploadFile(formFileData).subscribe(res=>{
    //   let data = res['content'];
    //   detailList[0].otherAttachment[0].id =  data[0].id;
    //   detailList[0].otherAttachment[0].fileField = "Plant_COAL_ORGINAL_CONTRACT";
    //   let form = {
    //     coalTypeId:formData.value.coalTypeId,
    //     landingHarborId:formData.value.landingHarborId,
    //     requestDetail:detailList
    //   }
    //   this.plantService.createCoalPlant(form).subscribe(res=>{
    //     if(res){
    //       this.toastr.success('request Submitted Successfully');
    //       this.router.navigateByUrl('operations/requestsSubmitted');
    //     }
    //   });
    // });
  }
  getRequestById(id, inputFieldsList?) {
    this.requestSubmittedService
      .getCustomerRequestById(id)
      .subscribe((request) => {
        this.customerRequestData = request['content'];
        this.model = this.customerRequestData;

        this.getCoalType();
        //     let requestCompnay = this.companies.filter((c)=>{
        //  return c.id == this.customerRequestData.companyId
        // })[0];

        if (request['content'].status == 'AcceptProtectEEA') {
          this.formType = 'view-only';
        }
      });
  }
  navigateToExpense(n: number) {
    if (n == 1)
      this.router.navigateByUrl('operations/feesAndExpenses/' + this.requestId);
  }
  getInputFieldsToBeEditted(id) {
    /*    this.operationsApiService.getInputField(id).subscribe((response) => {
      this.inputsList = response.content.map((field) => field.field);
      this.inputsListIds = response.content.map(field => field.id)
      this.getRequestById(id, this.inputsList);
    });*/
  }
}
