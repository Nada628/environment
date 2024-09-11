import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyValidationFormSerivce {
  govList;
  mainModel;

  constructor() {}

  getCompanyAttachmentByKey(request, fileField) {
    return { url: '' };
  }

  initForm(companyData?) {
    return (this.mainModel = {
      name: {
        label: 'companyValidationForm.name',
        value: companyData ? companyData.manager_name : '',
        col: 'col-md-5 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      email: {
        type: 'text',
        value: companyData ? companyData.email : '',
        col: 'col-md-7 col-12',
        label: 'companyValidationForm.email',
        rules: {
          required: true,
          email: true,
        },
      },
      position: {
        label: 'companyValidationForm.position',
        value: '',
        col: 'col-md-5 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },

      comRegisterNum: {
        type: 'number',
        value: '',
        col: 'col-md-2 col-12',
        label: 'companyValidationForm.comRegisterNum',
        rules: {
          required: true,
        },
      },
      COMMERCIAL_NUMBER_PAPER: {
        name: 'COMMERCIAL_NUMBER_PAPER',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          COMMERCIAL_NUMBER_PAPER: {
            type: 'file',
            value: '',
            id: 'COMMERCIAL_NUMBER_PAPER',
            col: 'col-md-4 col-12 ',
            label: companyData
              ? 'common.download'
              : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
          from: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
        },
      },
      phone: {
        label: 'companyValidationForm.mobileNom',
        value: '',
        col: 'col-md-5 col-12',
        type: 'number',
        rules: {
          required: true,
        },
      },
      tax_record_number: {
        type: 'number',
        value: '',
        col: 'col-md-2',
        label: 'companyValidationForm.taxId',
        rules: {
          required: true,
        },
      },
      TAX_REGISTER_DOC: {
        name: 'TAX_REGISTER_DOC',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          TAX_REGISTER_DOC: {
            type: 'file',
            value: '',
            id: 'TAX_REGISTER_DOC',
            col: 'col-md-4 col-12 ',
            label: companyData
              ? 'common.download'
              : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
          from: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
        },
      },
      nationalId: {
        label: 'companyValidationForm.nationalId',
        value: '',
        col: 'col-md-5 col-12',
        type: 'number',
        rules: {
          required: true,
        },
      },
      NATIONAL_ID: {
        name: 'NATIONAL_ID',
        type: 'input-group',
        col: 'col-md-7 col-12',
        subModel: {
          NATIONAL_ID: {
            type: 'file',
            value: '',
            id: 'NATIONAL_ID',
            col: 'col-md-6 col-12 ',
            label: 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
          from: {
            type: 'date',
            value: '',
            col: 'col-md-3 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: '',
            col: 'col-md-3 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
        },
      },
    });
  }
}
