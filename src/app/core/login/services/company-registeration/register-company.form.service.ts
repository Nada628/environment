import { CompanyType } from '@shared/model/company-type';
import { Injectable } from '@angular/core';
import { ActivityType } from '@shared/model/activity-type';

@Injectable({
  providedIn: 'root',
})
export class RegisterCompanyFormSerivce {
  govList;
  mainModel;
  industrailData;
  companyTypes: any[];
  activityTypes: ActivityType[];

  constructor() {}

  setGovList(list) {
    this.govList = list;
  }

  setCompanyTypeList(list) {
    this.companyTypes = list;
  }

  setActivityTypeList(list) {
    this.activityTypes = list;
  }

  getCompanyAttachmentByKey(request, fileField) {
    return request?.attachments.find(
      (attachment) => attachment.fileField === fileField
    );
  }

  initForm(companyData?) {
    this.mainModel = {
      name: {
        label: 'companyRegistrationForm.companyName',
        value: companyData ? companyData['name'] : '',
        col: 'col-md-5 col-12',
        type: 'text',
        rules: { 
          required: true,
        },
      },
      manager_name: {
        type: 'text',
        value: companyData ? companyData['manager_name'] : '',
        col: 'col-md-7 col-12',
        label: 'companyRegistrationForm.managerName',
        rules: {
          required: true,
        },
      },
      company_type_id: {
        label: 'companyRegistrationForm.companyType',
        value: companyData ? companyData['company_type_id'] : '',
        col: 'col-md-5 col-12',
        type: 'select',
        options: this.companyTypes,
        rules: {
          required: true,
        },
      },
      tax_registration_number: {
        type: 'number',
        value: companyData ? companyData['tax_registration_number'] : '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.comRegisterNum',
        rules: {
          required: true,
        },
      },
      tax_registration_file: {
        name: 'tax_registration_file',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          from: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(
                  companyData,
                  'tax_registration_file'
                ).validFromDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(
                  companyData,
                  'tax_registration_file'
                ).validToDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
          attach: {
            id: 'tax_registration_file',
            type: companyData ? 'download' : 'file',
            value: companyData
              ? this.getCompanyAttachmentByKey(
                  companyData,
                  'tax_registration_file'
                ).url
              : '',
            col: 'col-md-4 col-12 ',
            label: companyData
              ? 'common.download'
              : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },

      activity_id: {
        label: 'companyRegistrationForm.companyActivityType',
        value: companyData ? companyData['activity_id'] : '',
        col: 'col-md-5 col-12',
        type: 'select',
        // ظبط التايبس هنا ازاي نغير الاي دي لما يختار نوع منشأة
        options: this.activityTypes,
        rules: {
          required: true,
        },
      },
      tax_card_number: {
        type: 'number',
        value: companyData ? companyData['tax_card_number'] : '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.taxRegisterNum',
        rules: {
          required: true,
        },
      },

      tax_card_file: {
        name: 'tax_card_file',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          from: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'tax_record_from')
                  .validFromDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'tax_record_to')
                  .validToDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
          attach: {
            id: 'tax_card_file',
            type: companyData ? 'download' : 'file',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'tax_card_file').url
              : '',
            col: 'col-md-4 col-12 ',
            label: companyData
              ? 'common.download'
              : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },
      purpose_of_use: {
        type: 'text',
        value: companyData ? companyData['purpose_of_use'] : '',
        col: 'col-md-5 col-12',
        label: 'companyRegistrationForm.reasonOfUsage',
        rules: {
          required: true,
        },
      },
      industrial_registration_number: {
        type: 'number',
        value: companyData ? companyData['industrial_registration_number'] : '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.industrialRegisterNum',
        // rules: {
        //   required: true,
        // },
      },
      industrial_registration_file: {
        name: 'industrial_registration_file',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          from: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(
                  companyData,
                  'industrial_registration_file'
                ).validFromDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            // rules: {
            //   required: true,
            // },
          },
          to: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(
                  companyData,
                  'industrial_registration_file'
                ).validToDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            // rules: {
            //   required: true,
            // },
          },
          attach: {
            id: 'industrial_registration_file',
            type: companyData ? 'download' : 'file',
            value: companyData
              ? this.getCompanyAttachmentByKey(
                  companyData,
                  'industrial_registration_file'
                ).url
              : '',
            col: 'col-md-4 col-12 ',
            label: companyData
              ? 'common.download'
              : 'companyRegistrationForm.attach',
            // rules: {
            //   required: true,
            // },
          },
        },
      },
      address: {
        type: 'text',
        value: companyData ? companyData['address'] : '',
        col: 'col-md-3 col-12',
        label: 'companyRegistrationForm.companyAddress',
        rules: {
          required: true,
        },
      },
      gov_id: {
        label: 'companyRegistrationForm.gov',
        value: companyData ? companyData['gov_id'] : '',
        col: 'col-md-2 col-12',
        type: 'select',
        options: this.govList,
        rules: {
          required: true,
        },
      },
      // accept_eea_number: {
      //   label: 'companyRegistrationForm.envApprovalNum',
      //   value: companyData ? companyData['accept_eea_number'] : '',
      //   col: 'col-md-2 col-12',
      //   type: 'number',
      //   rules: {
      //     required: true,
      //   },
      // },
      environmental_approval_file: {
        id: 'environmental_approval_file',
        type: companyData ? 'download' : 'file',
        value: companyData
          ? this.getCompanyAttachmentByKey(
              companyData,
              'environmental_approval_file'
            ).url
          : '',
        col: 'col-md-2 col-12 ',
        label: companyData
          ? 'common.download'
          : 'companyRegistrationForm.accept_eea',
        rules: {
          required: true,
        },
      },
      accept_eea_papre: {
        name: 'accept_eea_papre',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          release_date: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'accept_eea_papre')
                  .validFromDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.release',
            rules: {
              required: true,
            },
          },
          xCoordinate: {
            type: 'text',
            value: companyData ? companyData['xCoordinate'] : '',
            col: 'col-md-4 col-12',
            label: 'common.xCoordinate',
            rules: {
              required: true,
            },
          },
          yCoordinate: {
            type: 'text',
            value: companyData ? companyData['yCoordinate'] : '',
            col: 'col-md-4 col-12',
            label: 'common.yCoordinate',
            rules: {
              required: true,
            },
          },
          // to: {
          //   type: 'date',
          //   value: companyData
          //     ? this.getCompanyAttachmentByKey(companyData, 'accept_eea_papre')
          //         .validToDate
          //     : '',
          //   col: 'col-md-4 col-12',
          //   label: 'common.to',
          //   rules: {
          //     required: true,
          //   },
          // },
          // accept_eea_papre: {
          //   id: 'accept_eea_papre',
          //   type: companyData ? 'download' : 'file',
          //   value: companyData
          //     ? this.getCompanyAttachmentByKey(companyData, 'accept_eea_papre').url
          //     : '',
          //   col: 'col-md-4 col-12 ',
          //   label: companyData
          //     ? 'common.download'
          //     : 'companyRegistrationForm.attach',
          //   rules: {
          //     required: true,
          //   },
          // },
        },
      },

      phone_number: {
        type: 'text',
        value: companyData ? companyData['phone_number'] : '',
        col: 'col-md-3 col-12',
        label: 'companyRegistrationForm.companyPhone',
        rules: {
          required: true,
        },
      },
      city_code: {
        label: 'code',
        value: companyData ? companyData['city_code'] : '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      import_card_number: {
        label: 'companyRegistrationForm.permitRenewalPosition',
        value: companyData ? companyData['import_card_number'] : '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      import_card_paper: {
        name: 'import_card_paper',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          from: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'import_card_paper')
                  .validFromDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'import_card_paper')
                  .validToDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
          attach: {
            id: 'import_card_paper',
            type: companyData ? 'download' : 'file',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'import_card_paper')
                  .url
              : '',
            col: 'col-md-4 col-12 ',
            label: companyData
              ? 'common.download'
              : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },
      email: {
        type: 'text',
        value: companyData ? companyData['email'] : '',
        col: 'col-md-5 col-12',
        label: 'companyRegistrationForm.companyEmail',
        rules: {
          required: true,
          email: true,
        },
      },
      quota: {
        type: 'number',
        value: companyData ? companyData['quota'] : '',
        col: 'col-md-3 col-12',
        label: 'companyRegistrationForm.companyQuota',
        max: 1000,
        rules: {
          required: true,
          maxValue: 1000,
        },
      },
      quota_valid_from: {
        type: 'date',
        value: companyData ? companyData['quota_valid_from'] : '',
        col: 'col-md-2 col-12',
        label: 'common.from',
        rules: {
          required: true,
        },
      },
      quota_valid_to: {
        type: 'date',
        value: companyData ? companyData['quota_valid_to'] : '',
        col: 'col-md-2 col-12',
        label: 'common.to',
        rules: {
          required: true,
        },
      },
    };

    return this.mainModel;
  }

  // getActivityOptions(companyTypeId?) {
    // if (companyTypeId) {
      // this.setActivityTypeList(this.companyTypes[companyTypeId - 1]['company_activity']);
      // this.initForm();
      // console.log('activityTypes', this.activityTypes);
      // return companyTypeId;
  //   }
  // }

  initCoalPlantCompanyForm(companyData?) {
    this.mainModel = {
      name: {
        label: 'companyRegistrationForm.companyName',
        value: companyData ? companyData['name'] : '',
        col: 'col-md-5 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },

      commercial_record_number: {
        type: 'number',
        value: companyData ? companyData['commercial_record_number'] : '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.comRegisterNum',
        rules: {
          required: true,
        },
      },
      commercial_record_paper: {
        name: 'commercial_record_paper',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          commercial_record_paper: {
            id: 'commercial_record_paper',
            type: companyData ? 'download' : 'file',
            value: companyData
              ? this.getCompanyAttachmentByKey(
                  companyData,
                  'commercial_record_paper'
                ).url
              : '',
            col: 'col-md-4 col-12 ',
            label: companyData
              ? 'common.download'
              : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
          commercial_record_from: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(
                  companyData,
                  'commercial_record_paper'
                ).validFromDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          commercial_record_to: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(
                  companyData,
                  'commercial_record_paper'
                ).validToDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
        },
      },

      nationalId: {
        label: 'companyRegistrationForm.nationalId',
        value: companyData ? companyData.details.nationalId : '',
        col: 'col-md-5 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      tax_registration_number: {
        type: 'number',
        value: companyData ? companyData['tax_registration_number'] : '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.taxRegisterNum',
        rules: {
          required: true,
        },
      },

      tax_record_paper: {
        name: 'tax_record_paper',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          tax_record_paper: {
            id: 'tax_record_paper',
            type: companyData ? 'download' : 'file',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'tax_record_from')
                  .url
              : '',
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
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'tax_record_to')
                  .validFromDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'TAX_REGISTER_DOC')
                  .validToDate
              : '',
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
        value: companyData ? companyData['address'] : '',
        col: 'col-md-3 col-12',
        label: 'companyRegistrationForm.companyAddress',
        rules: {
          required: true,
        },
      },
      gov_id: {
        label: 'companyRegistrationForm.gov',
        value: companyData ? companyData['gov_id'] : '',
        col: 'col-md-2 col-12',
        type: 'select',
        options: this.govList,
        rules: {
          required: true,
        },
      },
      accept_eea_number: {
        label: 'companyRegistrationForm.envApprovalNum',
        value: companyData ? companyData['accept_eea_number'] : '',
        col: 'col-md-2 col-12',
        type: 'number',
        rules: {
          required: true,
        },
      },
      accept_eea_papre: {
        name: 'accept_eea_papre',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          accept_eea_from: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'accept_eea_papre')
                  .validFromDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          accept_eea_to: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'accept_eea_papre')
                  .validToDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
          accept_eea_papre: {
            id: 'accept_eea_papre',
            type: companyData ? 'download' : 'file',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'accept_eea_papre')
                  .url
              : '',
            col: 'col-md-4 col-12 ',
            label: companyData
              ? 'common.download'
              : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },
      phone_number: {
        type: 'text',
        value: companyData ? companyData['phone_number'] : '',
        col: 'col-md-3 col-12',
        label: 'companyRegistrationForm.companyPhone',
        rules: {
          required: true,
        },
      },
      city_code: {
        label: 'code',
        value: companyData ? companyData['city_code'] : '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      import_card_number: {
        label: 'companyRegistrationForm.permitRenewalPosition',
        value: companyData ? companyData['import_card_number'] : '',
        col: 'col-md-2 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      import_card_paper: {
        name: 'import_card_paper',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          from: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'import_card_paper')
                  .validFromDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'import_card_paper')
                  .validToDate
              : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
          import_card_paper: {
            id: 'import_card_paper',
            type: companyData ? 'download' : 'file',
            value: companyData
              ? this.getCompanyAttachmentByKey(companyData, 'import_card_paper')
                  .url
              : '',
            col: 'col-md-4 col-12 ',
            label: companyData
              ? 'common.download'
              : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
        },
      },
      email: {
        type: 'text',
        value: companyData ? companyData['email'] : '',
        col: 'col-md-5 col-12',
        label: 'companyRegistrationForm.companyEmail',
        rules: {
          required: true,
          email: true,
        },
      },
      producePower: {
        type: 'text',
        value: companyData ? companyData['quota'] : '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.producePower',
        rules: {
          required: true,
        },
      },
      quota_valid_from: {
        type: 'date',
        value: companyData ? companyData['quota_valid_from'] : '',
        col: 'col-md-2 col-12',
        label: 'common.from',
        rules: {
          required: true,
        },
      },
      quota_valid_to: {
        type: 'date',
        value: companyData ? companyData['quota_valid_to'] : '',
        col: 'col-md-2 col-12',
        label: 'common.to',
        rules: {
          required: true,
        },
      },
    };

    return this.mainModel;
  }
  industrailDataForm() {
    /*السجل الصناغي

     industry_record_number: {
        type: 'number',
        value: companyData ? companyData['industry_record_number'] : '',
        col: 'col-md-2 col-12',
        label: 'companyRegistrationForm.industrialRegisterNum',
        rules: {
          required: true,
        },
      },
      industry_record_paper: {
        name: 'industry_record_paper',
        type: 'input-group',
        col: 'col-md-5 col-12',
        subModel: {
          industry_record_paper: {
            id:'industry_record_paper',
            type: companyData ? 'download' : 'file',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'industry_record_paper' ).url : '',
            col: 'col-md-4 col-12 ',
            label: companyData ? 'common.download' : 'companyRegistrationForm.attach',
            rules: {
              required: true,
            },
          },
          from: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'industry_record_paper' ).validFromDate : '',
            col: 'col-md-4 col-12',
            label: 'common.from',
            rules: {
              required: true,
            },
          },
          to: {
            type: 'date',
            value: companyData  ?   this.getCompanyAttachmentByKey(companyData ,'industry_record_paper' ).validToDate : '',
            col: 'col-md-4 col-12',
            label: 'common.to',
            rules: {
              required: true,
            },
          },
        },
      },
    */
    this.industrailData = {
      details: {
        name: 'details',
        type: 'input-group',
        col: 'col-12',

        subModel: {
          weightInTon: {
            type: 'number',
            value: '',
            col: 'col-md-3',
            label: 'customer.quantityRdfTons',
            rules: {
              required: true,
            },
          },
          invoices: {
            type: 'file',
            value: '',
            col: 'col-md-3',
            id: 'invoices 1',
            label: 'customer.invoiceAttachement',
            rules: {
              required: true,
            },
          },

          date: {
            type: 'date',
            value: '',
            col: 'col-md-3',
            label: 'customer.date',
            rules: {
              required: true,
            },
          },
          providerName: {
            type: 'string',
            value: '',
            col: 'col-md-3',
            label: 'customer.supplierName',
            rules: {
              required: true,
            },
          },
        },
      },
    };

    /* this.totalRdf = {
       totalWeightInTon: {
         isDisabled:data?data.status!='CompleteEntry' && data.status !='Created':false,
         type: 'number',
         value: rdf?.totalWeightInTon,
         col: 'col-md-6 col-12',
         label: 'customer.totalRdf',
         checker: {
           fieldName: 'totalWeightInTonChecker',
           type: 'checkbox',
           value: false,
         },
         rules: {
           required: true,
         },
       },
     };
     this.wastePercentage= {
       wastePercentage:{
       name: 'wastePercentage',
       type: 'input-group',
       label: 'customer.cementCompanyPositionUseWasteFuel',
       checker: {
         fieldName: 'wastePercentageChecker',
         type: 'checkbox',
         value: false,
       },
       subModel: {
         wastePercentage: {
           value: 'wastePercentage',
           type: 'radio',
           labelCol: 'col-md-6 col-12',
           isDisabled:data?data.status!='CompleteEntry' && data.status !='Created':false,
           options: [
             {
               label: 'customer.greaterThanOrEqual',
               value: rdf?.includeEnergyReject==true?'wastePercentage':false,

             },
             {
               label: 'customer.lessThan',
               value: rdf?.includeEnergyReject==true?false:'wastePercentage',
             },
           ],
           rules: {
             required: true,
           },
         },
       }}
     };*/
  }
}
