import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentOfFeesService } from '@operations/services/payment-of-fees.service';
import { AuthService } from 'app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-approval-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './approval-form.component.html',
  styleUrl: './approval-form.component.scss'
})
export class ApprovalFormComponent {
  approvalForm = new FormGroup({})
  paymentDetails
  requestId
  constructor(
    private paymentOfFeesService: PaymentOfFeesService,
    private route: ActivatedRoute,
    private Router: Router,
    private auth: AuthService,
    private ToastrService: ToastrService,
  ){
    this.route.paramMap.subscribe((params) => {
      this.requestId = params.get('requestId');
    });
    this.getApprovalData()
  }



  getApprovalData(){
    this.paymentOfFeesService.getApprovalData(this.requestId).subscribe((res:any)=>{
      this.paymentDetails = res['data'];
    })
  }
  done(){
    let x=''
    this.paymentOfFeesService.approveForm(this.requestId,x).subscribe({
      next:(res)=>{console.log(res);
        this.ToastrService.success('تم الارسال بنجاح')
        this.Router.navigateByUrl('operations/statistics')
      }
    })
  }

  //manager 
 getPaymentDetailsByRequestId(){
  this.paymentOfFeesService.getPaymentDetailsForSupervisor(this.requestId).subscribe(
    (data) => {
      this.paymentDetails = data['data'];
    },
    (error) => {
      console.error('Error fetching payment details:', error);
    }
  );
 }

}
