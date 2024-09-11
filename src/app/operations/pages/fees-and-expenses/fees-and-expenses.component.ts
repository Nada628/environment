import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FeesAndExpensesApiService } from '@operations/services/fees-and-express.api.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReviewerFormComponent } from '@operations/components/reviewer-form/reviewer-form.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IsRequiredPipe } from '@shared/pipes/is-required.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslationService } from 'app/language/translation.service';
import { environment } from 'environments/environment';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AdmissionFormApiService } from '@operations/services/admission-form/admission-form-api.service';

@Component({
  selector: 'app-fees-and-expenses',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    ReactiveFormsModule,
    ReviewerFormComponent,
    NzRadioModule,
    NzFormModule,
    NzInputModule,
    IsRequiredPipe,
    NzButtonModule,
    NzSelectModule,
    FormsModule,
    RouterLink,
    NzDividerModule,
    NzModalModule,
    NzCollapseModule,
    NzAvatarModule,
    NzSpinModule,
    NzAlertModule,
  ],
  templateUrl: './fees-and-expenses.component.html',
  styleUrl: './fees-and-expenses.component.scss',
})
export class FeesAndExpensesComponent {
  feesForm = new FormGroup({
    currency_value: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    rdf_handred_percent: new FormControl(null, [Validators.required]),
    confirm: new FormControl<boolean>(null, [Validators.required]),
    notes: new FormControl(null),
  });

  requestId;
  url = environment.mediaUrl;

  checkRDFValue = true;

  constructor(
    private route: ActivatedRoute,
    private feesAndExpensesApi: FeesAndExpensesApiService,
    private router: Router,
    private translationService: TranslationService,
    private admissionFormApiService: AdmissionFormApiService,
  ) {
    this.route.params.subscribe((params) => {
      if (params['requestId']) {
        this.getFeesByRequestId(params['requestId']);
        this.requestId = params['requestId'];
        this.getPercent()
      }
    });

    this.getComments();
  }

  comments;
  gettingComments = false;
  getComments() {
    this.gettingComments = true;
    this.admissionFormApiService
      .getComments(this.requestId)
      .subscribe((res) => {
        this.gettingComments = false;
        this.comments = res['data'];
      });
    // this.comments = [
    //   {
    //     timeline_desc: 'ayyy7agggga for test on saturday, june 26, 2022',
    //     comment: 'asdasfdaskjfaskfsal for test on saturday, june 26, 2022',
    //   },
    //   {
    //     timeline_desc: 'ayyy7agggga for test on saturday, june 26, 2022',
    //     comment: 'asdasfdaskjfaskfsal for test on saturday, june 26, 2022',
    //   },
    // ]
  }

  feesData;
  getFeesByRequestId(id) {
    this.feesAndExpensesApi.getFeesByRequest(id).subscribe({
      next: (data) => {
        this.setRequestData(data['data']);
        this.feesData = data['data'];
        if (data['data']['invoice']) {
          this.checkRDFValue = true;
        } else {
          this.checkRDFValue = false;
        }
      },
      error: (error) => {
        this.translationService.toastrTranslation(
          'error',
          error['error']['message']
        );
      },
    });
  }

  price: '';
  total_weight_ton: '';
  ton_price_num: '';
  currency: '';
  hander_percent: '';
  comment: '';
  setRequestData(requestData) {
    this.feesForm.reset();
    if (requestData) {
      this.price = requestData?.price || '';
      this.comment = requestData?.comment || '';
      this.hander_percent = requestData?.hander_percent || '';
      this.total_weight_ton = requestData?.total_weight_ton || '';
      this.ton_price_num = requestData?.ton_price_num || '';
      this.currency = requestData?.currency || '';
    }
  }

  totalExpenses;
  getTotalExpenses() {
    this.feesAndExpensesApi
      .getTotalExpenses(this.requestId, {
        currency_value: this.feesForm.value.currency_value || null,
        date: this.feesForm.value.date || null,
        rdf_handred_percent: this.feesForm.value.rdf_handred_percent || null,
      })
      .subscribe((res) => {
        this.totalExpenses = res['totalExpenses'];
        console.log('res', res['totalExpenses']);
      });
  }

  getPercent(){
    this.feesAndExpensesApi.getPercentage(this.requestId).subscribe({
      next:(res:any)=>{
        this.feesForm.get('rdf_handred_percent').setValue( res.data.rdf_handred_percent )
        this.feesForm.get('rdf_handred_percent').disable()
        },
    })
  }

  totalRDF;
  getTotalRDF() {
    this.feesAndExpensesApi
      .getTotalExpenses(this.requestId, {
        currency_value: null,
        date: null,
        rdf_handred_percent: this.feesForm.value.rdf_handred_percent || null,
      })
      .subscribe((res) => {
        this.totalRDF = res['totalExpenses'];
        console.log('res', res['totalExpenses']);
      });
  }

  onSubmit() {
    if (this.feesForm.valid) {
      this.feesAndExpensesApi
        .saveFees(this.requestId, this.feesForm.value)
        .subscribe({
          next: (res) => {
            this.translationService.toastrTranslation('success', res['data']);
            this.router.navigateByUrl('operations/requestsSubmitted');
          },
          error: (error) => {
            this.translationService.toastrTranslation('error', error['data']);
          },
        });
    } else {
      Object.values(this.feesForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.translationService.toastrTranslation(
        'error',
        'toastr.enterValidValues'
      );
      return;
    }
  }
}
