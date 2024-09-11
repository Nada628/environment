import { CompanyType } from '@shared/model/company-type';
import { Injectable } from '@angular/core';
import { ActivityType } from '@shared/model/activity-type';

@Injectable({
  providedIn: 'root',
})
export class EditCompanyFormSerivce {
  govList;
  mainModel;
  companyTypes: CompanyType[];
  activityTypes: ActivityType[];

  constructor() {}

  initForm() {
    this.mainModel = {
      name: {
        label: 'companyRegistrationForm.companyName',
        value: '',
        col: 'col-md-6 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      manager_name: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12',
        label: 'companyRegistrationForm.managerName',
        rules: {
          required: true,
        },
      },
      type_id: {
        label: 'companyRegistrationForm.companyType',
        value: '',
        col: 'col-md-6 col-12',
        type: 'select',
        options: this.companyTypes,
        rules: {
          required: true,
        },
      },
      commercial_record_number: {
        type: 'text',
        value: '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.comRegisterNum',
        rules: {
          required: true,
        },
      },
      COMMERCIAL_NUMBER_PAPER: {
        name: 'COMMERCIAL_NUMBER_PAPER',
        type: 'input-group',
        col: 'col-md-4 col-12',
        subModel: {
          COMMERCIAL_NUMBER_PAPER: {
            type: 'file',
            value: '',
            col: 'col-md-4 col-12 ',
            label: 'companyRegistrationForm.attach',
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

      activity_id: {
        label: 'companyRegistrationForm.companyActivityType',
        value: '',
        col: 'col-md-6 col-12',
        type: 'select',
        options: this.activityTypes,
        rules: {
          required: true,
        },
      },
      tax_record_number: {
        type: 'text',
        value: '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.taxRegisterNum',
        rules: {
          required: true,
        },
      },

      TAX_REGISTER_DOC: {
        name: 'TAX_REGISTER_DOC',
        type: 'input-group',
        col: 'col-md-4 col-12',
        subModel: {
          TAX_REGISTER_DOC: {
            type: 'file',
            value: '',
            col: 'col-md-4 col-12 ',
            label: 'companyRegistrationForm.attach',
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
      purpose: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12',
        label: 'companyRegistrationForm.reasonOfUsage',
        rules: {
          required: true,
        },
      },
      industry_record_number: {
        type: 'text',
        value: '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.industrialRegisterNum',
        rules: {
          required: true,
        },
      },
      industry_record_paper: {
        name: 'industry_record_paper',
        type: 'input-group',
        col: 'col-md-4 col-12',
        subModel: {
          industry_record_paper: {
            type: 'file',
            value: '',
            col: 'col-md-4 col-12 ',
            label: 'companyRegistrationForm.attach',
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
      address: {
        type: 'text',
        value: '',
        col: 'col-md-4 col-12',
        label: 'companyRegistrationForm.companyAddress',
        rules: {
          required: true,
        },
      },
      gov_id: {
        label: 'companyRegistrationForm.gov',
        value: '',
        col: 'col-md-2 col-12',
        type: 'select',
        options: this.govList,
        rules: {
          required: true,
        },
      },
      accept_eea_number: {
        label: 'companyRegistrationForm.envApprovalNum',
        value: '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      accept_eea_papre: {
        name: 'accept_eea_papre',
        type: 'input-group',
        col: 'col-md-4 col-12',
        subModel: {
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
          accept_eea_papre: {
            type: 'file',
            value: '',
            col: 'col-md-4 col-12',
            label: 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },
      phone_number: {
        type: 'text',
        value: '',
        col: 'col-md-4 col-12',
        label: 'companyRegistrationForm.companyPhone',
        rules: {
          required: true,
        },
      },
      city_code: {
        label: 'code',
        value: '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      import_card_number: {
        label: 'companyRegistrationForm.permitRenewalPosition',
        value: '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      import_card_paper: {
        name: 'import_card_paper',
        type: 'input-group',
        col: 'col-md-4 col-12',
        subModel: {
          import_card_from: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          import_card_to: {
            type: 'date',
            value: '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
          import_card_paper: {
            type: 'file',
            value: '',
            col: 'col-md-4 col-12',
            label: 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },
      email: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12',
        label: 'companyRegistrationForm.companyEmail',
        rules: {
          required: true,
        },
      },
      quota: {
        type: 'text',
        value: '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.companyQuota',
        rules: {
          required: true,
        },
      },
      quota_valid_from: {
        type: 'date',
        value: '',
        col: 'col-md-2 col-12',
        label: 'common.from',
        rules: {
          required: true,
        },
      },
      quota_valid_to: {
        type: 'date',
        value: '',
        col: 'col-md-2 col-12',
        label: 'common.to',
        rules: {
          required: true,
        },
      },
    };

    return this.mainModel;
  }

  setGovList(list) {
    this.govList = list;
  }
  setCompanyTypeList(list) {
    this.companyTypes = list;
  }
  setActivityTypeList(list) {
    this.activityTypes = list;
  }
}
