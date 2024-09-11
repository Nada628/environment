import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeHarborService {
  mainModel;
  mainNote;
  statusArr;
  constructor() {}

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
  initForm(changeHarborForm?) {
    return (this.mainModel = {
      requestId: {
        label: 'changeHarbor.requestNumber',
        value: changeHarborForm ? changeHarborForm.requestId : '',
        col: 'col-md-5 col-12',
        type: 'select',
        options: changeHarborForm ? changeHarborForm.requestIds : [],
        rules: {
          required: true,
        },
        checker: {
          fieldName: 'companyIdChecker',
          type: 'checkbox',
          value: false,
        },
      },
      harborIds: {
        type: 'select',
        value: changeHarborForm ? changeHarborForm.harborIds : '',
        col: 'col-md-7 col-12',
        label: 'changeHarbor.exportHarbor',
        options: changeHarborForm ? changeHarborForm.exportHarborList : [],
        rules: {
          required: true,
        },
        checker: {
          fieldName: 'landingHarborIdChecker',
          type: 'checkbox',
          value: false,
        },
      },
      frontImage: {
        name: 'front',
        type: 'file',
        value: '',
        id: 'BACK_ORGINAL_CONTRACT',
        col: 'col-md-7 col-12 ',
        label: 'changeHarbor.acceptCopyFront',
        rules: {
          required: true,
        },
        checker: {
          fieldName: 'Original_Contract',
          type: 'checkbox',
          value: false,
        },
      },
      backImage: {
        name: 'back',
        type: 'file',
        value: '',
        id: 'FRONT_ORGINAL_CONTRACT',
        col: 'col-md-7 col-12 ',
        label: 'changeHarbor.acceptCopyBack',
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
}
