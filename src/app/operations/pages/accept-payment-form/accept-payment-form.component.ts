import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AttachedDocumentsComponent } from '@operations/components/attached-documents/attached-documents.component';
import { DigitalSealingFormComponent } from '@operations/components/digital-sealing-form/digital-sealing-form.component';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { FeesAndExpensesApiService } from '@operations/services/fees-and-express.api.service';
import { OperationsApiService } from '@operations/services/operations.api.service';
import { SubmitButtonComponent } from '@shared/components/buttons/submit-button/submit-button.component';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { SharedModule } from '@shared/shared.module';
import { AuthService } from 'app/core/services/auth.service';
import { RequestCoreService } from 'app/core/services/RequestCore.service';
import { ToastrService } from 'ngx-toastr';
// form 33
TranslatePipe;
@Component({
  selector: 'app-accept-payment-form',
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
  templateUrl: './accept-payment-form.component.html',
  styleUrl: './accept-payment-form.component.scss',
})
export class AcceptPaymentFormComponent implements OnInit {
  requestId;
  invoiceOfRequest;
  requestStatus;
  
  role;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fees: FeesAndExpensesApiService,
    private requestCoreService: RequestCoreService,
    private operationsApiService: OperationsApiService,
    private auth : AuthService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      this.requestId = params['requestId'];
    });

    this.role = this.auth.userRole;
    // this.requestCoreService.customerRequestStatus;

    // this.invoiceOfRequest = {
    //   'requesterName' : 'محمد',
    //   'date' : '2022-01-01',
    //   'entityName' : 'صندوق حماية البيئة',
    //   'establishCode' : '123456',
    //   'paymentType' : 'نقدى',
    //   'companyName' : 'كينج استون للفحم',
    //   'invoiceNumber' : '123456',
    //   'feesInArabic' : 'ستة الالاف ومئتان وسبعون جنية مصري لا غير.',
    //   'requestId' : '123456',
    //   'totalFee' : 123456,
    //   'requestFeesInvoiceDetailDtoList' : [
    //     {
    //       'service' : 'اصدار خطاب عدم ممانعه شحنات الفحم (حجري - بترولي)',
    //       'from' : '2022-01-01',
    //       'to' : '2022-01-01',
    //       'number' : 2222454121545124,
    //       'amount' : 6270.0,
    //     }
    //   ]
    // }
  }

  ngOnInit(): void {

    let parm = this.route.snapshot.params['AppNum']
    if (parm === 'AppNum') {
      this.getDataByApptNum()
    } else {
      this.fees.getPaidInvoice(this.requestId).subscribe((val) => {
        this.invoiceOfRequest = val['data'];
        this.requestStatus = this.requestCoreService.getCustomerRequestStatus();
        // this.initForm();
      });
    }
   
  }

  print() {
    window.print();
  }

  backToexpense() {
    this.router.navigateByUrl('operations/feesAndExpenses/' + this.requestId);
  }

  sendToCoalAdministration() {
    this.operationsApiService
      .updateRequestStatus(this.requestId, 'approve')
      .subscribe((res) => {
        this.toastr.success('Status Submitted Successfully');
        this.router.navigateByUrl('operations/requestsSubmitted');
      });
    // this.toastr.success('تم الارسال بنجاح')
    // this.router.navigateByUrl(
    //   `operations/statistics`
    // );
  }

  NavigateToAcceptTemplateForm() {
    if (this.requestCoreService.getRequstType() == 'coal-plant') {
      this.router.navigateByUrl(
        `operations/acceptTemplateNPlant/${this.requestId}`
      );
      return;
    }

    this.router.navigateByUrl(
      `operations/acceptFormTemplate/${this.requestId}`
    );
  }

  getDataByApptNum(){
    this.fees.getDataByRequestNum(this.requestId).subscribe((val) => {
      this.invoiceOfRequest = val['data'];
      this.requestStatus = this.requestCoreService.getCustomerRequestStatus();
      // this.initForm();
    });
  }
}
