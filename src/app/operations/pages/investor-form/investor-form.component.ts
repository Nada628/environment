import { CommonModule ,Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { AdmissionFormModelsService } from '@operations/services/admission-form/admission-form-models.service';
import { PaymentOfFeesService } from '@operations/services/payment-of-fees.service';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { IsRequiredPipe } from '@shared/pipes/is-required.pipe';
import { AuthService } from 'app/core/services/auth.service';
import { TranslationService } from 'app/language/translation.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-investor-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,RouterModule,ReviewerFormComponent,SubtitleComponent, IsRequiredPipe,],
  templateUrl: './investor-form.component.html',
  styleUrl: './investor-form.component.scss'
})
export class InvestorFormComponent {
name
file
url = environment.mediaUrl
 requestId: any;
  fileName: any;
  myArray:any[]=[]
  role= localStorage.getItem('roles')
  checkRDFValue: boolean;
  check33Value: boolean;
  statusArr: any;
  statusNote: any;
  mainNote: any;
  reviewersList: any;
  customerRequestData: any;

constructor(private paymentOfFeesService: PaymentOfFeesService,
   private translationService: TranslationService,
    private route: ActivatedRoute,
    private Router: Router,
    private auth: AuthService,
    private requestSubmittedService: RequestSubmittedService,
    private ToastrService: ToastrService,
    private admissionFormModelsService: AdmissionFormModelsService,
    private location: Location,
    
){
 this.role == "investors" ? this.statusArr=[{value:"approve",name:"تم"}]  :this.statusArr = this.admissionFormModelsService.statusArr;
  this.statusNote = this.admissionFormModelsService.statusNote;
  this.mainNote = this.admissionFormModelsService.mainNote;
  this.reviewersList = this.admissionFormModelsService.reviewersList;

this.route.paramMap.subscribe((params) => {
  this.requestId = params.get('id');
  this.getData()
  this.check33form()
  this.getRequestById(this.requestId)
});
}

data = new FormData()
filer
onSelectAttach(file:any){
  this.filer = file.target.files[0]
  console.log(this.filer);
  this.fileName=file.target.files[0].name
  console.log(this.fileName);
  
  
}

onSubmit(){
  this.data.append('attach',this.filer)
  this.data.append('title',this.name)
  this.paymentOfFeesService.investorForm(this.requestId,this.data).subscribe({
    next:(res)=>{console.log(res);
      this.getData()
    },
    error:(err)=>{console.log(err);
      
    },
  })
  
}
previous(){
  this.location.back()
}
removeIunloadCompaniesFile(i:any,id){
this.delete(id)
}

getData(){
  this.myArray=[]
  this.paymentOfFeesService.getInvestorForm(this.requestId).subscribe((res:any)=>{
    this.myArray=res.date
  })
}
delete(id:any){
  this.paymentOfFeesService.Delete(id).subscribe((res)=>{console.log(res);
    this.getData()
  })
}

check33form(){
  this.requestSubmittedService.getCustomerRequestById(this.requestId).subscribe((res:any)=>
    {
      console.log(res);
      if (res.data.is_33form) {
        this.check33Value=true
      } else {
        this.check33Value=false
      }
    })
  }
  getRequestById(id) {
    this.requestSubmittedService.getCustomerRequestById(id).subscribe({
      next: (data) => {
        this.customerRequestData = data['data'];
      },
      error: (error) => {
        this.translationService.toastrTranslation(
          'error',
          error['error']['message']
        );
      },
    });
  }

}
