import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PlantCoalServiceService {
  mainModel;
  mainNote;
  statusArr;
  constructor(private http: HttpClient) {
    this.init();
  }
  init() {
    this.mainNote = {
      mainNote: {
        type: 'textArea',
        value:
          'بعد المراجعة الفنية لشحنة الفحم المقدم بشأنها الطلب فانه سوف يتم خصم 25طن من الكوتة الخاصة بالمنشأة',
        col: 'col-md-8 col-12 my-4',
        rules: {
          required: true,
        },
      },
    };

    this.statusArr = [
      { name: 'customer.review', class: 'col-md-4 col-12' },
      { name: 'customer.approval', class: 'col-md-4 col-12' },
      { name: 'customer.rejection', class: 'col-md-4 col-12' },
    ];
  }
  initForm(plantForm, formType) {
    return (this.mainModel = {
      companyId: {
        label: 'plantCoal.usedCommercialIndustry',
        value: plantForm ? plantForm.companyId : '',
        col: 'col-md-5 col-12',
        type: 'select',
        isDisabled: formType == 'check' || formType == 'view-only',
        options: plantForm ? plantForm.industryRecords : [],
        rules: {
          required: true,
        },
        checker: {
          fieldName: 'companyIdChecker',
          type: 'checkbox',
          value: false,
        },
      },
      landingHarborId: {
        type: 'select',
        value: plantForm ? plantForm.landingHarborId : '',
        col: 'col-md-7 col-12',
        label: 'plantCoal.arriveHarbor',
        isDisabled: formType == 'check' || formType == 'view-only',
        options: plantForm ? plantForm.arriveHarborList : [],
        rules: {
          required: true,
        },
        checker: {
          fieldName: 'landingHarborIdChecker',
          type: 'checkbox',
          value: false,
        },
      },
      coalTypeId: {
        label: 'plantCoal.coalType',
        value: plantForm
          ? plantForm.requestDetail
            ? plantForm.requestDetail[0].coalTypeId
            : ''
          : '',
        col: 'col-md-5 col-12',
        type: 'select',
        isDisabled: formType == 'check' || formType == 'view-only',
        options: plantForm ? plantForm.coalTypeList : [],
        rules: {
          required: true,
        },
        checker: {
          fieldName: 'harborIds',
          type: 'checkbox',
          value: false,
        },
      },

      harborIds: {
        type: 'select',
        value: plantForm ? plantForm.harborIds : '',
        col: 'col-md-7 col-12',
        label: 'plantCoal.exportHarbor',
        isDisabled: formType == 'check' || formType == 'view-only',
        options: plantForm ? plantForm.exportHarborList : [],
        rules: {
          required: true,
        },
        checker: {
          fieldName: 'harborIds',
          type: 'checkbox',
          value: false,
        },
      },

      amountOfCoalPlanInTon: {
        type: 'number',
        value: plantForm
          ? plantForm.requestDetail
            ? plantForm.requestDetail[0].amountOfCoalPlanInTon
            : ''
          : '',
        col: 'col-md-5 col-12',
        label: 'plantCoal.amount',
        isDisabled: formType == 'check' || formType == 'view-only',
        rules: {
          required: true,
        },
        checker: {
          fieldName: 'amountOfCoalPlanInTon',
          type: 'checkbox',
          value: false,
        },
      },

      otherAttachment: {
        name: 'Original_Contract',
        type: plantForm
          ? plantForm.requestDetail
            ? plantForm.requestDetail[0].otherAttachment
              ? 'download'
              : 'file'
            : 'file'
          : 'file',
        value: plantForm?.requestDetail
          ? plantForm.requestDetail[0].otherAttachment[0]?.url
          : '',
        id: 'Plant_COAL_ORGINAL_CONTRACT',
        col: 'col-md-7 col-12 ',
        label: 'plantCoal.attach',
        rules: {
          required: true,
        },
        checker: {
          fieldName: 'Original_Contract',
          type: 'checkbox',
          value: false,
        },
      },
    });
  }

  initForm1(plantForm?) {
    return (this.mainModel = {
      requestDetail: {
        type: 'input-group',
        name: 'requestDetail',
        col: 'col-12',
        subModel: {
          companyId: {
            label: 'plantCoal.usedCommercialIndustry',
            value: plantForm ? plantForm.companyId : '',
            col: 'col-md-5 col-12',
            type: 'select',
            options: plantForm ? plantForm.industryRecords : [],
            rules: {
              required: true,
            },
            checker: {
              fieldName: 'companyIdChecker',
              type: 'checkbox',
              value: false,
            },
          },
          landingHarborId: {
            type: 'select',
            value: plantForm ? plantForm.landingHarborId : '',
            col: 'col-md-7 col-12',
            label: 'plantCoal.arriveHarbor',
            options: plantForm ? plantForm.arriveHarborList : [],
            rules: {
              required: true,
            },
            checker: {
              fieldName: 'landingHarborIdChecker',
              type: 'checkbox',
              value: false,
            },
          },
          coalTypeId: {
            label: 'plantCoal.coalType',
            value: plantForm
              ? plantForm.requestDetail
                ? plantForm.requestDetail[0].coalTypeId
                : ''
              : '',
            col: 'col-md-5 col-12',
            type: 'select',
            options: plantForm ? plantForm.coalTypeList : [],
            rules: {
              required: true,
            },
            checker: {
              fieldName: 'coalTypeId',
              type: 'checkbox',
              value: false,
            },
          },
          harborIds: {
            type: 'select',
            value: plantForm ? plantForm.harborIds : '',
            col: 'col-md-7 col-12',
            label: 'plantCoal.exportHarbor',
            options: plantForm ? plantForm.exportHarborList : [],
            rules: {
              required: true,
            },
            checker: {
              fieldName: 'harborIds',
              type: 'checkbox',
              value: false,
            },
          },
          amountOfCoalPlanInTon: {
            type: 'number',
            value: plantForm
              ? plantForm.requestDetail
                ? plantForm.requestDetail[0].amountOfCoalPlanInTon
                : ''
              : '',
            col: 'col-md-5 col-12',
            label: 'plantCoal.amount',
            rules: {
              required: true,
            },
            checker: {
              fieldName: 'amountOfCoalPlanInTon',
              type: 'checkbox',
              value: false,
            },
          },

          otherAttachment: {
            name: 'Original_Contract',
            type: 'file',
            value: '',
            id: 'Plant_COAL_ORGINAL_CONTRACT',
            col: 'col-md-7 col-12 ',
            label: 'plantCoal.attach',
            rules: {
              required: true,
            },
            checker: {
              fieldName: 'Original_Contract',
              type: 'checkbox',
              value: false,
            },
          },
        },
      },
    });
  }

  uploadAttachment(obj, customerRequestData?) {
    //Check if the form is valid to move to another step
    if (obj.valid) {
      /*   this.uploadAttchment(
          obj['Plant_COAL_ORGINAL_CONTRACT'],
          'Plant_COAL_ORGINAL_CONTRACT',
          key)*/
      return;
    }
  }
  createCoalPlant(form) {
    const url = `${environment.apiUrl}/portal/customer-request/plant-coal/5`;
    return this.http.post(url, form);
  }
}
