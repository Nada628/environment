import { ToastrService } from 'ngx-toastr';
import { PaymentOfFeesService } from '@operations/services/payment-of-fees.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NzFormModule } from 'ng-zorro-antd/form';
import { AuthService } from 'app/core/services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IsRequiredPipe } from '@shared/pipes/is-required.pipe';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [CommonModule,
    SharedModule,
    SubtitleComponent,
    NzFormModule,
    NzInputModule,
    IsRequiredPipe,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss',
})
export class PaymentDetailsComponent {
  paymentDetails;
  checkRdf;
  approval
  role;
  requestId;
  approvalForm: FormGroup;
  paymentForm = new FormGroup({
    recet_num: new FormControl<number | undefined | null>(undefined, [Validators.required]),
    recet_date: new FormControl<string | undefined | null>('', [Validators.required]),
    // recet_file: new FormControl<File | undefined | null>(undefined),
  });
  constructor(
    private fb: FormBuilder,
    private paymentOfFeesService: PaymentOfFeesService,
    private route: ActivatedRoute,
    private Router: Router,
    private auth: AuthService,
    private ToastrService: ToastrService,
  ) {
   
    this.role = this.auth.userRole;
    this.route.paramMap.subscribe((params) => {
      this.requestId = params.get('requestId');
      this.getCustomerPaymentDetails(this.requestId);
    });
    
   
  }

  url = environment.mediaUrl
  getCustomerPaymentDetails(id) {
    this.paymentOfFeesService.getPaymentDetailsByRequestId(id).subscribe(
      (data) => {
        this.paymentDetails = data['data'];
        this.checkRdf = data['data']['is_rdf'];
      },
      (error) => {
        console.error('Error fetching payment details:', error);
      }
    );
  }

  

  // getApprovalData(){
  //   this.paymentOfFeesService.getApprovalData(this.requestId).subscribe((res:any)=>{
  //     this.customer_name=res.data.customer_name
  //     this.date=res.data.date
  //     this.import_coal_company=res.data.import_coal_company
  //     this.incoming_harbor_name=res.data.incoming_harbor_name
  //     this.total_weight_ton=res.data.total_weight_ton
  //     this.shipment_date=res.data.shipment_date
  //     this.coal_type_name=res.data.coal_type_name
  //     this.companies=res.data.companies
  //     this.transfer_steps=res.data.transfer_steps
  //     this.request_expense_created_at=res.data.request_expense_created_at

  //     this.approvalForm = this.fb.group({
  //       requestType: ['res.data.import_coal_company'],
  //       date1: [''],
  //       date2: [''],
  //       otherFields: this.fb.group({
  //         field1: [''],
  //         field2: [''],
  //         field3: [''],
  //         field4: [''],
  //         field5: [''],
  //         field6: [''],
  //       })
  //     });
  //   })
  // }
  getApprovalData(){
    this.paymentOfFeesService.getApprovalData(this.requestId).subscribe((res:any)=>{
      this.paymentDetails = res['data'];
      // this.checkRdf = res['data']['is_rdf'];
    })
  }

  attach;
  attachName;
  onSelectAttach(info: File) {
    if (info[0]) {
      this.attachName = info[0].name;
      this.attach = info[0];

      console.log(this.attach);
    }
  }

  rdf_attach;
  rdf_attachName;
  onSelectRdfAttach(info: File) {
    if (info[0]) {
      this.rdf_attachName = info[0].name;
      this.rdf_attach = info[0];

      console.log(this.rdf_attach);
    }
  }

  onSubmit() {
    if (this.role === 'customer') {
      if (this.checkRdf) {
        if (this.attach && this.rdf_attach) {
          this.paymentOfFeesService
            .expensePayment(this.requestId, {
              attach: this.attach,
              rdf_attach: this.rdf_attach,
            })
            .subscribe({
              next: (data) => {
                this.ToastrService.success(data['msg']);
                this.Router.navigate(['/operations/paymentOfFees']);
              },
              error: (error) => {
                this.ToastrService.error(error['msg']);
              },
            });
        } else {
          this.ToastrService.error('يجب تحميل الملفات');
        }
      } else {
        if (this.attach) {
          this.paymentOfFeesService
            .expensePayment(this.requestId, {
              attach: this.attach,
              rdf_attach: this.rdf_attach,
            })
            .subscribe({
              next: (data) => {
                this.ToastrService.success(data['msg']);
                this.Router.navigate(['/operations/paymentOfFees']);
              },
              error: (error) => {
                this.ToastrService.error(error['msg']);
              },
            });
        } else {
          this.ToastrService.error('يجب تحميل الملفات');
        }
      }
    }
    else {
      this.paymentOfFeesService
        .expensePaymentForImport(this.requestId, this.paymentForm.value)
        .subscribe({
          next: (data) => {
            this.ToastrService.success(data['msg']);
            this.Router.navigate([`/operations/acceptInvoiceForm/${this.requestId}/request`]);
          },
          error: (error) => {
            this.ToastrService.error(error['msg']);
          },
        });
    }
  }
  print(){
    window.print()
  }
    
// department_supervisor
 

 assigneInvestor(){
  let data={
    "user_id":localStorage.getItem('userId'),
    "status":"approve" // reject
  }
  this.paymentOfFeesService.assignInvestor(this.requestId,data).subscribe(
    (data) => {
      console.log(this.paymentDetails);
    },
    (error) => {
      console.error('Error fetching payment details:', error);
    }
  );
 }
  
}
