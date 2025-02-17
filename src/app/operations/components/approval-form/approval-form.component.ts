import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ApprovalFormService } from '@operations/services/approval-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval-form',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent, TranslateModule],
  templateUrl: './approval-form.component.html',
  styleUrl: './approval-form.component.scss',
})
export class ApprovalFormComponent {
  shipmentFormModel;
  approvalIntroModel;
  approvalTermsModel;
  
  constructor(private approvalForm: ApprovalFormService,private router: Router,) {
    this.shipmentFormModel = approvalForm.shipmentInfoForm;
    this.approvalIntroModel = approvalForm.approvalIntroForm;
    this.approvalTermsModel = approvalForm.approvalTermsForm;
    
    
  }
  onSubmit(){
    this.approvalForm.sendToClient('51').subscribe({
      next:(res)=>{
        this.router.navigateByUrl('/operations/statistics');
      }
    })

  }
}
