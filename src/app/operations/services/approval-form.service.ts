import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApprovalFormService {
  shipmentInfoForm;
  approvalIntroForm;
  approvalTermsForm;
  apiUrl = environment.apiUrl;
  requestId: any
  response:any
  constructor(private http: HttpClient, private auth: AuthService, private router: Router,
    private route: ActivatedRoute,) {
    

   

    this.approvalIntroForm = {
      greetings: {
        type: 'text',
        value: '55',
        col: 'col-md-5 col-12  pb-3',
        label: 'approvalIntroForm.greetings',
        isDisabled:false,
        labelCol: 'col-md-6 col',
        rules: {
          required: true,
        },
      },
      greetings2: {
        type: 'text',
        value: '',
        col: 'col-md-12 col-12 pb-3 invisible text-center',
        label: 'approvalIntroForm.greetings2',
        labelCol: 'col-md-4 col',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      inCorpWithEeaa: {
        type: 'text',
        value: 'في اطار التعاون',
        col: 'col-md-11 col-12 pb-3',
        label: 'approvalIntroForm.inCorpWithEeaa',
        labelCol: 'col-md-8 col',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      toEeaa: {
        type: 'date',
        value: 'فحم 22',
        col: 'col-md-5 col-12 pb-3',
        label: 'approvalIntroForm.toEeaa',
        labelCol: 'col-md-5 col',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      carryOutShipment: {
        type: 'text',
        value: 'فحم 22',
        col: 'col-md-6 col-12 pb-3',
        label: 'approvalIntroForm.carryOutShipment',
        labelCol: 'col-md-6 col',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      carriedBy: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-4 col-12 pb-3',
        label: 'approvalIntroForm.carriedBy',
        labelCol: 'col-md-4 col',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      arrivingTo: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-5 col-12 pb-3',
        label: 'approvalIntroForm.arrivingTo',
        labelCol: 'col-md-6 col',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      arrivingDate: {
        type: 'date',
        value: 'فحم حجري',
        col: 'col-md-3 col-12 pb-3',
        label: 'approvalIntroForm.arrivingDate',
        labelCol: 'col-md-2 col',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
    };
    this.shipmentInfoForm = {
      shipmentReceivedFrom: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.shipmentReceivedFrom',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      importingBeneficial: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.importingBeneficial',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      dateOfImport: {
        type: 'date',
        value: 'فحم حجري',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.dateOfImport',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      companyResponsibleForCarryOut: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.companyResponsibleForCarryOut',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      companyResponsibleForCarryOut2: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.companyResponsibleForCarryOut',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      harbor: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.harbor',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      shipName: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.shipName',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      wayOfCarryOut: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.wayOfCarryOut',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      totalTons: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.totalTons',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      arrivalDate: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.arrivalDate',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
      coalType: {
        type: 'text',
        value: 'فحم حجري',
        col: 'col-md-6 col-12 pb-3',
        label: 'shipmentInfoForm.coalType',
        isDisabled:false,
        rules: {
          required: true,
        },
      },
    };
    this.approvalTermsForm = {
      label1: {
        type: 'text',
        value: '',
        col: 'col-md-12 col-12 pb-3 invisible',
        label: 'approvalTermsForm.label1',
        isDisabled:false,
        labelCol: 'col-md-12 col',
        rules: {
          required: true,
        },
      },
      noIssueFor: {
        type: 'text',
        value: '',
        col: 'col-md-7 col-12 pb-3',
        label: 'approvalTermsForm.noIssueFor',
        isDisabled:false,
        labelCol: 'col-md-7 col',
        rules: {
          required: true,
        },
      },
      carryingOutShipment: {
        type: 'text',
        value: '',
        col: 'col-md-5 col-12 pb-3',
        label: 'approvalTermsForm.carryingOutShipment',
        labelCol: 'col-md-5 col',
        rules: {
          required: true,
        },
      },
      toBeUsedFor: {
        type: 'text',
        value: '',
        col: 'col-md-4 col-12 pb-3',
        label: 'approvalTermsForm.toBeUsedFor',
        labelCol: 'col-md-4 col',
        rules: {
          required: true,
        },
      },
      by: {
        type: 'text',
        value: '',
        col: 'col-md-5 col-12 pb-3',
        label: 'approvalTermsForm.by',
        labelCol: 'col-md-5 col',
        rules: {
          required: true,
        },
      },
      harbor: {
        type: 'text',
        value: '',
        col: 'col-md-3 col-12 pb-3',
        label: 'approvalTermsForm.harbor',
        labelCol: 'col-md-2 col',
        rules: {
          required: true,
        },
      },
      thus: {
        type: 'text',
        value: '',
        col: 'col-md-12 col-12 pb-3',
        label: 'approvalTermsForm.thus',
        labelCol: 'col-md-1 col',
        rules: {
          required: true,
        },
      },
      harborManagementTo: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'approvalTermsForm.harborManagementTo',
        labelCol: 'col-md-6 col',
        rules: {
          required: true,
        },
      },
      byCompany: {
        type: 'text',
        value: '',
        col: 'col-md-3 col-12 pb-3',
        label: 'approvalTermsForm.byCompany',
        labelCol: 'col-md-3 col',
        rules: {
          required: true,
        },
      },
      byCompany2: {
        type: 'text',
        value: '',
        col: 'col-md-3 col-12 pb-3',
        label: 'approvalTermsForm.byCompany',
        labelCol: 'col-md-3 col',
        rules: {
          required: true,
        },
      },
      label2: {
        type: 'text',
        value: '',
        col: 'col-md-12 col-12 pb-3 invisible',
        label: 'approvalTermsForm.label2',
        labelCol: 'col-md-12 col',
        rules: {
          required: true,
        },
      },
      notedThat: {
        type: 'date',
        value: '',
        col: 'col-md-10 col-12 pb-3',
        label: 'approvalTermsForm.notedThat',
        labelCol: 'col-md-8 col',
        rules: {
          required: true,
        },
      },
      allPaymentsDone: {
        type: 'date',
        value: '',
        col: 'col-md-10 col-12 pb-3',
        label: 'approvalTermsForm.allPaymentsDone',
        labelCol: 'col-md-8 col',
        rules: {
          required: true,
        },
      },
      labelEnd: {
        type: 'text',
        value: '',
        col: 'col-md-12 col-12 pb-3 invisible',
        label: 'approvalTermsForm.labelEnd',
        labelCol: 'col-md-12 col',
        rules: {
          required: true,
        },
      },
    };
    
  }

  sendToClient(params:any) {
    const url = `${this.apiUrl}expense-payment/update/import/request/form/data/${params}`;
    let x=""
    return this.http.put(url,x);
  }
  

  
  }
  
