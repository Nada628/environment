import { rule } from './../../../shared/model/input.model';
import { TranslationService } from '../../../language/translation.service';
import { Injectable } from '@angular/core';
import {
  AdmissionFormCompanyDetails,
  DigitalSealModel,
} from '@operations/models/customerForm.model';
import { AdmissionFormService } from './admission-form.service';
import { UtilitiesService } from '@shared/services/utilities.service';
import { AuthService } from 'app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdmissionFormModelsService {
  currentLang: string;
  digitalSealingModel: DigitalSealModel;
  statusArr;
  statusNote;
  mainNote;
  reviewersList;

  isReviewer: boolean = false;
  userRole;
  userPermissions: string[] = JSON.parse(localStorage.getItem('permissions'));

  constructor(
    private translationService: TranslationService,
    private admissionFormService: AdmissionFormService,
    private utilsService: UtilitiesService,
    private auth: AuthService
  ) {
    // this.userPermissions.map((permission) => {
    // });
    this.userRole = this.auth.userRole;

    this.currentLang = this.translationService.currentLang;

    this.statusArr = [
      { name: 'customer.approval', value: 'approve', icon: 'bi-check-circle' },
      { name: 'customer.complete', value: 'complete', icon: 'bi-info-circle' },
      { name: 'customer.rejection', value: 'reject', icon: 'bi-x-circle' },
    ];

    this.statusNote = {
      statusNote: {
        type: 'textArea',
        value:
          'بعد المراجعة الفنية للطلب المقدم بشأن تفريغ الشحنة المطلوبة تم التأكد من جميع البيانات والمرفقات المطلوبة',
        col: 'col-12',
        rules: {
          required: true,
        },
      },
    };

    // if (this.isReviewer) {
    //   this.reviewersList = [
    //     {
    //       id: 6,
    //       name: 'user1',
    //     },
    //     {
    //       id: 7,
    //       name: 'user2',
    //     },
    //     {
    //       id: 9,
    //       name: 'user3',
    //     },
    //   ];
    // } else {
    //   this.reviewersList = [];
    // }

    //Digital Sealing Model
    this.initDigitalSealling();
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
  }

  initDigitalSealling(request?) {
    this.digitalSealingModel = {
      confirmPayment: {
        label: 'admissionForm.rovalOfPayment',
        value: request ? request.confirmPayment : false,
        type: 'checkbox',
      },
      confirmAgentExist: {
        label: 'admissionForm.acknowledgmentFromTheAuthorizedPerson',
        value: request ? request.confirmAgentExist : false,
        type: 'checkbox',
      },
      confirmHookUsed: {
        label: 'admissionForm.letterFromThePortApprovingTheUseOfTheHook',
        value: request ? request.confirmHookUsed : false,
        type: 'checkbox',
      },
    };
    return this.digitalSealingModel;
  }

  //Main model
  getMainModel(mainModelArrays, request?, inputsList?, userType?) {
    let companySelectValues =
      userType == 'customer'
        ? mainModelArrays.ownerCompaniesArr
        : mainModelArrays.allCompanies;

    let model: any = {
      company_id: {
        label: 'admissionForm.company',
        value: request?.company_id,
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        col: 'col-md-5 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'company_id',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        checker: {
          fieldName: 'companyIdChecker',
          type: 'checkbox',
          value: false,
        },
        options: companySelectValues,
        rules: {
          required: true,
        },
      },

      source_country_id: {
        label: 'admissionForm.DestinationOfOrigin',
        value: request?.source_country_id,
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        col: 'col-md-7 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'source_country_id',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        checker: {
          fieldName: 'sourceCountryIdChecker',
          type: 'checkbox',
          value: false,
        },
        options: mainModelArrays.countryArr,
        rules: {
          required: true,
        },
      },
      import_harbor_id: {
        type: 'text',
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        value: request?.import_harbor_id,
        col: 'col-md-5 col-12 pb-3',
        label: 'admissionForm.portShipmentReceived',
        border: this.admissionFormService.isInputToBeEdited(
          'import_harbor_id',
          inputsList
        )
          ? 'border border-warning'
          : '',
        checker: {
          fieldName: 'importHarborIdChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      shipment_date: {
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        type: 'date',
        value: request?.shipment_date,
        col: 'col-md-7 col-12 pb-3',
        label: 'admissionForm.dateOfShipment',
        border: this.admissionFormService.isInputToBeEdited(
          'shipment_date',
          inputsList
        )
          ? 'border border-warning'
          : '',
        checker: {
          fieldName: 'shipDateChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      landing_harbor_id: {
        label: 'admissionForm.portAccess',
        value: request?.landing_harbor_id,
        // value: 1,
        col: 'col-md-4 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'landing_harbor_id',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        checker: {
          fieldName: 'landingHarborIdChecker',
          type: 'checkbox',
          value: false,
        },
        options: mainModelArrays.harborArr,
        rules: {
          required: true,
        },
      },
      ship_name: {
        type: 'text',
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        value: request?.ship_name,
        col: 'col-md-4 col-12 pb-3',
        label: 'admissionForm.shipName',
        border: this.admissionFormService.isInputToBeEdited(
          'ship_name',
          inputsList
        )
          ? 'border border-warning'
          : '',
        checker: {
          fieldName: 'shipNameChecker',
          type: 'checkbox',
          value: false,
          rule: {
            required: true,
          },
        },
        rules: {
          required: true,
        },
      },
      arrived_date: {
        type: 'date',
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        value: request?.arrived_date,
        col: 'col-md-4 col-12 pb-3',
        label: 'admissionForm.dateOfArrivalAtPort',
        border: this.admissionFormService.isInputToBeEdited(
          'arrived_date',
          inputsList
        )
          ? 'border border-warning'
          : '',
        checker: {
          fieldName: 'arrivedDateChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      total_price_char: {
        type: 'number',
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        value: request?.total_price_char,
        col: 'col-md-4 col-12 pb-3',
        label: 'admissionForm.totalShipmentWeight',
        border: this.admissionFormService.isInputToBeEdited(
          'total_price_char',
          inputsList
        )
          ? 'border border-warning'
          : '',
        checker: {
          fieldName: 'weightInTonChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      price_per_ton: {
        type: 'number',
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        value: request?.price_per_ton,
        col: 'col-md-2 col-12 pb-3',
        label: 'admissionForm.tonPriceByNumbers',
        checker: {
          fieldName: 'pricePerTonChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      price_per_ton_char: {
        type: 'text',
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        value: request?.price_per_ton_char,
        col: 'col-md-2 col-12 pb-3',
        label: 'admissionForm.tonPriceByWords',
        checker: {
          fieldName: 'pricePerTonCharChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      currency_id: {
        label: 'admissionForm.currency',
        value: request?.currency_id,
        col: 'col-md-2 col-12 pb-3',
        type: 'select',
        checker: {
          fieldName: 'charCurrencyIdChecker',
          type: 'checkbox',
          value: false,
        },
        options: mainModelArrays.currencyArr,
        rules: {
          required: true,
        },
      },
      invoice: {
        type: request !== undefined ? 'download' : 'file',
        value: request?.attachment[0].url,
        col: 'col-md-2 col-12 pb-3',
        id: 'customerAdmissionFormInvoice',
        label: 'admissionForm.attachInvoice',
        checker: {
          fieldName: 'invoiceChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          // required: request?.invoice == null || request?.invoice == undefined,
          required: false,
        },
      },
      coal_type_id: {
        label: 'admissionForm.coalType',
        value: request?.coal_type_id,
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        col: 'col-md-5 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'coal_type_id',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        checker: {
          fieldName: 'coalIdChecker',
          type: 'checkbox',
          value: false,
        },
        options: mainModelArrays.coalType,
        rules: {
          required: true,
        },
      },

      coal_price: {
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        type: 'number',
        value: request?.coal_price,
        col: 'col pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'coal_price',
          inputsList
        )
          ? 'border border-warning'
          : '',
        label: 'admissionForm.TotalPriceNumber',
        checker: {
          fieldName: 'totalPriceChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      coal_price_char: {
        type: 'text',
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        value: request?.coal_price_char,
        col: 'col pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'coal_price_char',
          inputsList
        )
          ? 'border border-warning'
          : '',
        label: 'admissionForm.TotalPriceWords',
        checker: {
          fieldName: 'totalPriceInCharChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      coal_currency_id: {
        label: 'admissionForm.currency',
        value: request?.coal_currency_id,
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        col: 'col pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'coal_currency_id',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        options: mainModelArrays.currencyArr,
        checker: {
          fieldName: 'currencyIdChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      import_coal_company_id: {
        type: 'select',
        options: mainModelArrays.importCoalCompany,
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        value: request?.import_coal_company_id,
        col: 'col-md-5 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'import_coal_company_id',
          inputsList
        )
          ? 'border border-warning'
          : '',
        label: 'admissionForm.coalSupplyingCompany',
        checker: {
          fieldName: 'importCoalCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      unload_way_id: {
        label: 'admissionForm.unloadingMethod',
        value: request?.unload_way_id,
        checker: {
          fieldName: 'unLoadWayIdChecker',
          type: 'checkbox',
          value: false,
        },
        col: 'col-md-7 col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'unload_way_id',
          inputsList
        )
          ? 'border border-warning'
          : '',
        type: 'select',
        options: mainModelArrays.unloadMethod,
        rules: {
          required: true,
        },
      },
      shipment_stages: {
        type: 'text',
        isDisabled: request
          ? request.status != 'CompleteEntry' && request.status != 'Created'
          : false,
        value: request?.shipment_stages,
        col: 'col-12 pb-3',
        border: this.admissionFormService.isInputToBeEdited(
          'shipment_stages',
          inputsList
        )
          ? 'border border-warning'
          : '',
        label: 'admissionForm.shipmentHandlingStages',
        checker: {
          fieldName: 'shipmentStagesChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required: true,
        },
      },
      // **************
      unload_company_id: {
        label: 'admissionForm.' + 'UNLOAD_ACCEPT_PAPER',
        value: request?.requestDetail.find(
          (c) => c.companyAcceptance?.fileField === 'UNLOAD_ACCEPT_PAPER'
        ).unload_company_id,
        addCompany: true,
        col: 'col-md-3 col-6',
        type: 'select',
        checker: {
          fieldName: 'unloadCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        nullOption: true,
        options: mainModelArrays.unloadCompany, //TODO: get this from api k
      },

      unload_company: {
        type:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'UNLOAD_ACCEPT_PAPER',
            inputsList
          )
            ? 'download'
            : 'file',
        // value:
        //   request &&
        //   !this.admissionFormService.isInputToBeEdited(
        //     'UNLOAD_ACCEPT_PAPER',
        //     inputsList
        //   )
        //     ? this.admissionFormService.getCompanyDetailsByType(
        //         request,
        //         'UNLOAD_ACCEPT_PAPER'
        //       )['unload_company']['url']
        //     : '',
        value: '',
        checker: {
          fieldName: 'unloadCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        col: 'col-md-2 col-6',
        label:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'UNLOAD_ACCEPT_PAPER',
            inputsList
          )
            ? 'DownLoad Company Acceptance'
            : 'admissionForm.companyAcceptance',
        id: request !== undefined ? 'UNLOAD_ACCEPT_PAPER' + 0 : 0,
      },

      unload_company_aproval_number: {
        type: 'number',
        value: request
          ? this.admissionFormService.getCompanyDetailsByType(
              request,
              'UNLOAD_ACCEPT_PAPER'
            )['unload_company_aproval_number']
          : '',
        col: 'col-md-2 col-6',
        checker: {
          fieldName: 'unloadCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        label: 'admissionForm.companyEnvironmentalApprovalNumber',
      },
      unload_company_aproval_date: {
        type: 'date',
        value: request
          ? this.utilsService.convertDate(
              this.admissionFormService.getCompanyDetailsByType(
                request,
                'UNLOAD_ACCEPT_PAPER'
              )['unload_company_aproval_date']
            )
          : '',
        checker: {
          fieldName: 'unloadCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        col: 'col-md col-6',
        label: 'admissionForm.acceptanceData',
      },

      otherAttachment: {
        type:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'UNLOAD_ACCEPT_PAPER',
            inputsList
          )
            ? 'download'
            : 'file',
        value:
          // request &&
          // !this.admissionFormService.isInputToBeEdited(
          //   'UNLOAD_ACCEPT_PAPER',
          //   inputsList
          // )
          //   ? this.admissionFormService.getCompanyDetailsByType(
          //       request,
          //       'UNLOAD_ACCEPT_PAPER'
          //     ).otherAttachment?.[0]
          //     ? [0]['url']
          //     : ''
          //   : '',
          '',
        col: 'col-md col-6',
        checker: {
          fieldName: 'unloadCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        label:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'UNLOAD_ACCEPT_PAPER',
            inputsList
          )
            ? 'DownLoad Attachment'
            : 'admissionForm.fileAttachment',
        addButton: true,
        id: request !== undefined ? 'UNLOAD_ACCEPT_PAPER' + 0 : 0,
        addButtonCol: 'col',
        // rules: {
        //   required: true,
        // },
      },
      // Store
      store_company_id: {
        label: 'admissionForm.' + 'TRANSPORT_ACCEPT_PAPER',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        value: request?.store_company_id,
        addCompany: true,
        col: 'col-md-3 col-6',
        type: 'select',
        nullOption: true,
        options: mainModelArrays.storeCompany,
        // rules: {
        //   required: true,
        // },
      },
      store_company: {
        type:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_ACCEPT_PAPER',
            inputsList
          )
            ? 'download'
            : 'file',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        value:
          // request &&
          // !this.admissionFormService.isInputToBeEdited(
          //   'STORE_ACCEPT_PAPER',
          //   inputsList
          // )
          //   ? this.admissionFormService.getCompanyDetailsByType(
          //       request,
          //       'STORE_ACCEPT_PAPER'
          //     )['store_company']['url']
          //   : '',
          '',
        col: 'col-md-2 col-6',
        label:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_ACCEPT_PAPER',
            inputsList
          )
            ? 'DownLoad Company Acceptance'
            : 'admissionForm.companyAcceptance',
        id: request !== undefined ? 'UNLOAD_ACCEPT_PAPER' + 0 : 0,
        // rules: {
        //   required: true,
        // },
      },

      store_company_aproval_number: {
        type: 'number',
        value: request
          ? this.admissionFormService.getCompanyDetailsByType(
              request,
              'STORE_ACCEPT_PAPER'
            )['store_company_aproval_number']
          : '',
        col: 'col-md col-6',
        label: 'admissionForm.companyEnvironmentalApprovalNumber',
        // rules: {
        //   required: true,
        // },
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
      },
      store_company_aproval_date: {
        type: 'date',
        value: request
          ? this.utilsService.convertDate(
              this.admissionFormService.getCompanyDetailsByType(
                request,
                'STORE_ACCEPT_PAPER'
              )['store_company_aproval_date']
            )
          : '',
        col: 'col-md col-6',
        label: 'admissionForm.acceptanceData',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        // rules: {
        //   required: true,
        // },
      },
      store_otherAttachment: {
        type:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_ACCEPT_PAPER',
            inputsList
          )
            ? 'download'
            : 'file',
        value:
          // request &&
          // !this.admissionFormService.isInputToBeEdited(
          //   'STORE_ACCEPT_PAPER',
          //   inputsList
          // )
          //   ? this.admissionFormService.getCompanyDetailsByType(
          //       request,
          //       'STORE_ACCEPT_PAPER'
          //     ).otherAttachment?.[0]
          //     ? [0]['url']
          //     : ''
          //   : '',
          '',
        col: 'col-md col-6',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        label:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_ACCEPT_PAPER',
            inputsList
          )
            ? 'DownLoad Attachment'
            : 'admissionForm.fileAttachment',
        addButton: true,
        id: request !== undefined ? 'STORE_ACCEPT_PAPER' + 2 : 2 + 1,
        addButtonCol: 'col',
        // rules: {
        //   required: true,
        // },
      },
      // Transport

      transport_company_id: {
        label: 'admissionForm.' + 'STORE_ACCEPT_PAPER',
        value: request?.transport_company_id,
        addCompany: true,
        col: 'col-md-3 col-6',
        type: 'select',
        nullOption: true,
        options: mainModelArrays.transportCompany,
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        // rules: {
        //   required: true,
        // },
      },
      transport_company: {
        type:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_ACCEPT_PAPER',
            inputsList
          )
            ? 'download'
            : 'file',
        value:
          // request &&
          // !this.admissionFormService.isInputToBeEdited(
          //   'STORE_ACCEPT_PAPER',
          //   inputsList
          // )
          //   ? this.admissionFormService.getCompanyDetailsByType(
          //       request,
          //       'STORE_ACCEPT_PAPER'
          //     )['transport_company']['url']
          //   : '',
          '',
        col: 'col-md-2 col-6',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        label:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_ACCEPT_PAPER',
            inputsList
          )
            ? 'DownLoad Company Acceptance'
            : 'admissionForm.companyAcceptance',
        id: request !== undefined ? 'UNLOAD_ACCEPT_PAPER' + 0 : 0,
        // rules: {
        //   required: true,
        // },
      },

      transport_company_aproval_number: {
        type: 'number',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        value: request
          ? this.admissionFormService.getCompanyDetailsByType(
              request,
              'STORE_ACCEPT_PAPER'
            )['transport_company_aproval_number']
          : '',
        col: 'col-md col-6',
        label: 'admissionForm.companyEnvironmentalApprovalNumber',
        // rules: {
        //   required: true,
        // },
      },
      transport_company_aproval_date: {
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        type: 'date',
        value: request?.transport_company_aproval_date,
        col: 'col-md col-6',
        label: 'admissionForm.acceptanceData',
        // rules: {
        //   required: true,
        // },
      },
      transport_otherAttachment: {
        type:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_ACCEPT_PAPER',
            inputsList
          )
            ? 'download'
            : 'file',
        value:
          // request &&
          // !this.admissionFormService.isInputToBeEdited(
          //   'STORE_ACCEPT_PAPER',
          //   inputsList
          // )
          //   ? this.admissionFormService.getCompanyDetailsByType(
          //       request,
          //       'STORE_ACCEPT_PAPER'
          //     ).transport_otherAttachment?.[0]
          //     ? [0]['url']
          //     : ''
          //   : '',
          '',
        col: 'col-md col-6',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        label:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_ACCEPT_PAPER',
            inputsList
          )
            ? 'DownLoad Attachment'
            : 'admissionForm.fileAttachment',
        addButton: true,
        id: request !== undefined ? 'STORE_ACCEPT_PAPER' + 4 : 4 + 1,
        addButtonCol: 'col',
        // rules: {
        //   required: true,
        // },
      },

      // centeral

      centeral_store_company_id: {
        label: 'admissionForm.' + 'STORE_INTERMEDIATE_PAPER',
        value: request?.centeral_store_company_id,
        addCompany: true,
        col: 'col-md-3 col-6',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        type: 'select',
        nullOption: true,
        options: mainModelArrays.centralStoreCompany,
        // rules: {
        //   required: true,
        // },
      },
      centeral_store: {
        type:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_INTERMEDIATE_PAPER',
            inputsList
          )
            ? 'download'
            : 'file',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        value:
          // request &&
          // !this.admissionFormService.isInputToBeEdited(
          //   'STORE_INTERMEDIATE_PAPER',
          //   inputsList
          // )
          //   ? this.admissionFormService.getCompanyDetailsByType(
          //       request,
          //       'STORE_INTERMEDIATE_PAPER'
          //     )['centeral_store']['url']
          //   : '',
          '',
        col: 'col-md-2 col-6',
        label:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_INTERMEDIATE_PAPER',
            inputsList
          )
            ? 'DownLoad Company Acceptance'
            : 'admissionForm.companyAcceptance',
        id: request !== undefined ? 'UNLOAD_ACCEPT_PAPER' + 0 : 0,
        // rules: {
        //   required: true,
        // },
      },

      centeral_store_company_aproval_number: {
        type: 'number',
        value: request
          ? this.admissionFormService.getCompanyDetailsByType(
              request,
              'STORE_INTERMEDIATE_PAPER'
            )['centeral_store_company_aproval_number']
          : '',
        col: 'col-md col-6',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        label: 'admissionForm.companyEnvironmentalApprovalNumber',
        // rules: {
        //   required: true,
        // },
      },
      centeral_store_company_aproval_date: {
        type: 'date',
        value: request
          ? this.utilsService.convertDate(
              this.admissionFormService.getCompanyDetailsByType(
                request,
                'STORE_INTERMEDIATE_PAPER'
              )['centeral_store_company_aproval_date']
            )
          : '',
        col: 'col-md col-6',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        label: 'admissionForm.acceptanceData',
        // rules: {
        //   required: true,
        // },
      },
      centeral_store_otherAttachment: {
        type:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_INTERMEDIATE_PAPER',
            inputsList
          )
            ? 'download'
            : 'file',
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        value:
          // request &&
          // !this.admissionFormService.isInputToBeEdited(
          //   'STORE_INTERMEDIATE_PAPER',
          //   inputsList
          // )
          //   ? this.admissionFormService.getCompanyDetailsByType(
          //       request,
          //       'STORE_INTERMEDIATE_PAPER'
          //     ).transport_otherAttachment?.[0]
          //     ? [0]['url']
          //     : ''
          //   : '',
          '',
        col: 'col-md col-6',
        label:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'STORE_INTERMEDIATE_PAPER',
            inputsList
          )
            ? 'DownLoad Attachment'
            : 'admissionForm.fileAttachment',
        addButton: true,
        id: request !== undefined ? 'STORE_INTERMEDIATE_PAPER' + 6 : 6 + 1,
        addButtonCol: 'col',
        // rules: {
        //   required: true,
        // },
      },

      // HARBOR_LANDING_RIVER

      harbor_landing_river_id: {
        label: 'admissionForm.' + 'HARBOR_LANDING_RIVER',
        value: request?.harbor_landing_river_id,
        addCompany: true,
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        col: 'col-md-3 col-6',
        type: 'select',
        nullOption: true,
        options: mainModelArrays.riverCompany,
        // rules: {
        //   required: true,
        // },
      },
      harbor_landing_river: {
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        type:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'HARBOR_LANDING_RIVER',
            inputsList
          )
            ? 'download'
            : 'file',
        value:
          // request &&
          // !this.admissionFormService.isInputToBeEdited(
          //   'HARBOR_LANDING_RIVER',
          //   inputsList
          // )
          //   ? this.admissionFormService.getCompanyDetailsByType(
          //       request,
          //       'HARBOR_LANDING_RIVER'
          //     )['harbor_landing_river']['url']
          //   : '',
          '',
        col: 'col-md-2 col-6',
        label:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'HARBOR_LANDING_RIVER',
            inputsList
          )
            ? 'DownLoad Company Acceptance'
            : 'admissionForm.companyAcceptance',
        id: request !== undefined ? 'UNLOAD_ACCEPT_PAPER' + 0 : 0,
        // rules: {
        //   required: true,
        // },
      },

      harbor_landing_river_id_aproval_number: {
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        type: 'number',
        value: request
          ? this.admissionFormService.getCompanyDetailsByType(
              request,
              'HARBOR_LANDING_RIVER'
            )['harbor_landing_river_id_aproval_number']
          : '',
        col: 'col-md col-6',
        label: 'admissionForm.companyEnvironmentalApprovalNumber',
        // rules: {
        //   required: true,
        // },
      },
      harbor_landing_river_id_aproval_date: {
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        type: 'date',
        value: request
          ? this.utilsService.convertDate(
              this.admissionFormService.getCompanyDetailsByType(
                request,
                'HARBOR_LANDING_RIVER'
              )['harbor_landing_river_id_aproval_date']
            )
          : '',
        col: 'col-md col-6',
        label: 'admissionForm.acceptanceData',
        // rules: {
        //   required: true,
        // },
      },
      harbor_landing_river_otherAttachment: {
        checker: {
          fieldName: 'storeCompanyChecker',
          type: 'checkbox',
          value: false,
        },
        type:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'HARBOR_LANDING_RIVER',
            inputsList
          )
            ? 'download'
            : 'file',
        value:
          // request &&
          // !this.admissionFormService.isInputToBeEdited(
          //   'HARBOR_LANDING_RIVER',
          //   inputsList
          // )
          //   ? this.admissionFormService.getCompanyDetailsByType(
          //       request,
          //       'HARBOR_LANDING_RIVER'
          //     ).harbor_landing_river_otherAttachment?.[0]
          //     ? [0]['url']
          //     : ''
          //   : '',
          '',
        col: 'col-md col-6',
        label:
          request !== undefined &&
          !this.admissionFormService.isInputToBeEdited(
            'HARBOR_LANDING_RIVER',
            inputsList
          )
            ? 'DownLoad Attachment'
            : 'admissionForm.fileAttachment',
        addButton: true,
        id: request !== undefined ? 'HARBOR_LANDING_RIVER' + 10 : 10 + 1,
        addButtonCol: 'col',
        // rules: {
        //   required: true,
        // },
      },
    };

    this.initDigitalSealling(request);
    return model;
  }

  //Document Model
  getDocumentModel(req?) {
    let model = {
      INSURANCE_POLICR: {
        type: req !== undefined ? 'download' : 'file',
        value: req?.INSURANCE_POLICR?.url,
        col: 'col-md col-6',
        label:
          req !== undefined
            ? 'Incurance policy'
            : 'admissionForm.fileAttachment',
        addButtonCol: 'col',
        id: 'INSURANCE_POLICR' + 1,
        requiredDocument: 'admissionForm.billOfLading',
        checker: {
          fieldName: 'destinationOfOriginChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required:
            req?.INSURANCE_POLICR == null ||
            req?.INSURANCE_POLICR == undefined ||
            req == null,
        },
      },
      COMPANY_CONTRACT_COAL: {
        type: req !== undefined ? 'download' : 'file',
        value: req?.COMPANY_CONTRACT_COAL?.url,
        col: 'col-md col-6',
        label:
          req !== undefined
            ? 'Company Contract Coal'
            : 'admissionForm.fileAttachment',
        id: 'COMPANY_CONTRACT_COAL' + 2,
        addButtonCol: 'col',
        requiredDocument: 'admissionForm.partyToWhichCoalIsSupplied',
        checker: {
          fieldName: 'destinationOfOriginChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required:
            req?.COMPANY_CONTRACT_COAL?.url == null ||
            req?.COMPANY_CONTRACT_COAL?.url == undefined ||
            req == null,
        },
      },
      SHIP_REGISTRY: {
        type: req !== undefined ? 'download' : 'file',
        value: req?.SHIP_REGISTRY?.url,
        col: 'col-md col-6',
        label:
          req !== undefined ? 'Ship Registry' : 'admissionForm.fileAttachment',
        id: 'SHIP_REGISTRY' + 3,
        addButtonCol: 'col',
        requiredDocument: 'admissionForm.recordingShipmentData',
        checker: {
          fieldName: 'destinationOfOriginChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required:
            req?.SHIP_REGISTRY == null || req?.SHIP_REGISTRY == undefined,
        },
      },
    };
    return model;
  }

  //Case Model
  getCaseModel(req?) {
    let model = {
      HOOK_ACCEPT_PAPER: {
        type: req !== undefined ? 'download' : 'file',
        value: req?.HOOK_ACCEPT_PAPER?.url,
        col: 'col-md col-6',
        label:
          req !== undefined
            ? 'Hook Accept Paper'
            : 'admissionForm.fileAttachment',
        id: 'HOOK_ACCEPT_PAPER' + 4,
        addButtonCol: 'col',
        requiredDocument: 'admissionForm.approvingTheUseOfHook',
        checker: {
          fieldName: 'destinationOfOriginChecker',
          type: 'checkbox',
          value: false,
        },
        rules: {
          required:
            req?.HOOK_ACCEPT_PAPER == null ||
            req?.HOOK_ACCEPT_PAPER == undefined,
        },
      },
    };
    return model;
  }

  getCompanyTypeAndDetailsv2(request, label: string, companies) {
    const company = {
      companyId: {
        label: 'admissionForm.' + label,
        // value: request?.requestDetail.find(
        //   (c) => c.companyAcceptance?.fileField === label
        // ).companyId,
        value: 1,
        addCompany: true,
        col: 'col-md col-6',
        type: 'select',
        options: companies,
        // rules: {
        //   required: true,
        // },
      },
      // companyAcceptance: {
      //   type:
      //     request !== undefined &&
      //       !this.admissionFormService.isInputToBeEdited(
      //         label,
      //         inputsList
      //       )
      //       ? 'download'
      //       : 'file',
      //   value:
      //     request &&
      //       !this.admissionFormService.isInputToBeEdited(
      //         label,
      //         inputsList
      //       )
      //       ? this.admissionFormService.getCompanyDetailsByType(
      //         request,
      //         label
      //       )['companyAcceptance']['url']
      //       : '',
      //   col: 'col-md col-6',
      //   label:
      //     request !== undefined &&
      //       !this.admissionFormService.isInputToBeEdited(
      //         label,
      //         inputsList
      //       )
      //       ? 'DownLoad Company Acceptance'
      //       : 'admissionForm.companyAcceptance',
      //   id: id,
      rules: {
        required: true,
      },
      // },
    };
  }
  //Company Model
  getCompanyTypeAndDetails(
    companyType: string,
    addButton: boolean,
    companies,
    request,
    id,
    inputsList
  ) {
    const company: AdmissionFormCompanyDetails = {
      name: companyType,
      type: 'input-group',
      col: 'col-12 pb-3',
      border: this.admissionFormService.isInputToBeEdited(
        companyType,
        inputsList
      )
        ? 'border border-warning rounded-20 p-2 m-2'
        : '',
      checker: {
        fieldName: companyType + 'Checker',
        type: 'checkbox',

        value: false,
        rules: {
          required: true,
        },
      },
      subModel: {
        companyId: {
          label: 'admissionForm.' + companyType,
          value: request?.requestDetail.find(
            (c) => c.companyAcceptance?.fileField === companyType
          ).companyId,
          addCompany: true,
          col: 'col-md col-6',
          type: 'select',
          options: companies,
          rules: {
            required: true,
          },
        },
        companyAcceptance: {
          type:
            request !== undefined &&
            !this.admissionFormService.isInputToBeEdited(
              companyType,
              inputsList
            )
              ? 'download'
              : 'file',
          value:
            request &&
            !this.admissionFormService.isInputToBeEdited(
              companyType,
              inputsList
            )
              ? this.admissionFormService.getCompanyDetailsByType(
                  request,
                  companyType
                )['companyAcceptance']['url']
              : '',
          col: 'col-md col-6',
          label:
            request !== undefined &&
            !this.admissionFormService.isInputToBeEdited(
              companyType,
              inputsList
            )
              ? 'DownLoad Company Acceptance'
              : 'admissionForm.companyAcceptance',
          id: id,
          rules: {
            required: true,
          },
        },
        companyAcceptanceNumber: {
          type: 'number',
          value: request
            ? this.admissionFormService.getCompanyDetailsByType(
                request,
                companyType
              )['companyAcceptanceNumber']
            : '',
          col: 'col-md col-6',
          label: 'admissionForm.companyEnvironmentalApprovalNumber',
          rules: {
            required: true,
          },
        },
        acceptDate: {
          type: 'date',
          value: request
            ? this.utilsService.convertDate(
                this.admissionFormService.getCompanyDetailsByType(
                  request,
                  companyType
                )['acceptDate']
              )
            : '',
          col: 'col-md col-6',
          label: 'admissionForm.acceptanceData',
          rules: {
            required: true,
          },
        },
        otherAttachment: {
          type:
            request !== undefined &&
            !this.admissionFormService.isInputToBeEdited(
              companyType,
              inputsList
            )
              ? 'download'
              : 'file',
          value:
            // request &&
            // !this.admissionFormService.isInputToBeEdited(
            //   companyType,
            //   inputsList
            // )
            //   ? this.admissionFormService.getCompanyDetailsByType(
            //       request,
            //       companyType
            //     ).otherAttachment?.[0]
            //     ? [0]['url']
            //     : ''
            //   : '',
            '',
          col: 'col-md col-6',
          label:
            request !== undefined &&
            !this.admissionFormService.isInputToBeEdited(
              companyType,
              inputsList
            )
              ? 'DownLoad Attachment'
              : 'admissionForm.fileAttachment',
          addButton: addButton,
          id: id + 1,
          addButtonCol: 'col',
          rules: {
            required: true,
          },
        },
        id: {
          value: request
            ? this.admissionFormService.getCompanyDetailsByType(
                request,
                companyType
              )['id']
            : 0,
          col: 'invisible',
          type: 'number',
          rules: {
            required: false,
          },
          label: '',
        },
      },
    };
    return company;
  }
}
