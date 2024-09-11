import { TranslationService } from '../../language/translation.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeesAndExpensesService {
  feesForm;
  totalForm;
  currentLang;
  reviewersList;
  statusArr;
  statusNote;
  customerRequest;
  currencyList;
  manualOrVisa;

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.currentLang;
  }

  setCustomerRequest(request) {
    this.customerRequest = request;
    //his.initForm(this.customerRequest);
  }

  InitTotalAndReviewForm(requestFees, customerRequest, Iscustomer) {
    let total = 0;
    if (requestFees) {
      total = requestFees.edaraFees + requestFees.ratioEdaraFee;
    }
    this.totalForm = {
      total: {
        type: 'number',
        value: total,
        col: ' col-12',
        label: 'customer.totalFees',
        labelStyle: 'normalFormLabel',
        labelCol: 'col-auto',
      },
    };
    if (!Iscustomer) {
      this.statusArr = [
        {
          name: 'customer.approval',
          value: 'AcceptProtectEEA',
          class: 'col-md-6 col-12',
        },
        {
          name: 'customer.rejection',
          value: 'Rejected',
          class: 'col-md-6 col-12',
        },
      ];
      this.reviewersList = [
        {
          name: 'مصطفي محمد 1',
        },
      ];
      this.statusNote = {
        AddNotesRegardingTheWasteDevice: {
          value: 'AddNotesRegardingTheWasteDevice',
          type: 'radio',
          options: [
            {
              label: 'customer.ConfirmValueOfExpenses',
              value: 'ConfirmValueOfExpenses',
              class: 'col-12',
            },
            {
              label: 'customer.rejection',
              value: 'rejection',
              class: 'col-12',
            },
          ],
          rules: {
            required: true,
          },
        },
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
    }
    if (Iscustomer) {
      this.manualOrVisa = {
        ManualOrVisa: {
          value: 'payAutomatic',
          type: 'radio',
          options: [
            {
              label: 'customer.payAutomatic',
              value: 'payAutomatic',
              class: 'col-12',
            },
            {
              label: 'customer.PayManual',
              value: 'PayManual',
              class: 'col-12',
            },
          ],
        },
      };
    }
  }

  initForCoalPlant(requestFees, customerRequest, Iscustomer) {
    return (this.feesForm = {
      administrativeFees: {
        name: 'administrativeFees',
        type: 'input-group',
        isDisabled: true,

        //  labelStyle: 'boldFormLabel fs-5',
        subModel: {
          TotalShipmentWeightInTons: {
            type: 'number',
            isDisabled: true,
            value: requestFees ? requestFees.totalTon : 0,
            col: this.currentLang === 'ar' ? 'col-12 mb-3 ps-0' : 'col-12 pe-0',
            label: 'plantCoal.TotalShipmentWeightInTons',
            labelStyle: 'normalFormLabel',
            labelCol: 'col-4',
            rules: {
              required: true,
            },
          },

          totalRequest: {
            type: 'number',
            isDisabled: true,
            value: requestFees ? requestFees.totalFee : 0,
            col: this.currentLang === 'ar' ? 'col-6 mb-3 ps-0' : 'col-12 pe-0',
            label: 'customer.feeValue',
            labelStyle: 'normalFormLabel',
            labelCol: 'col-auto',
            rules: {
              required: true,
            },
          },
        },
        administrativeExpensesInEgyptianPounds: {
          type: 'number',
          isDisabled: true, //Iscustomer && customerRequest.status =='AcceptProtectEEA'
          value: requestFees ? requestFees.edaraFees : '',
          col: ' col-12 pb-3',
          label: 'customer.administrativeExpensesInEgyptianPounds',
          labelStyle: 'normalFormLabel',
          rules: {
            required: true,
          },
        },
      },
    });
  }

  initForm(requestFees, customerRequest, Iscustomer) {
    this.customerRequest = customerRequest;
    console.log(customerRequest);
    this.InitTotalAndReviewForm(requestFees, customerRequest, Iscustomer);
    if (customerRequest?.requestType.code == 'coal-plant') {
      return this.initForCoalPlant(requestFees, customerRequest, Iscustomer);
    }
    return (this.feesForm = {
      administrativeExpensesInEgyptianPounds: {
        type: 'number',
        isDisabled: true, //Iscustomer && customerRequest.status =='AcceptProtectEEA'
        value: requestFees ? requestFees.edaraFees : '',
        col: ' col-12 pb-3',
        label: 'customer.administrativeExpensesInEgyptianPounds',
        labelStyle: 'normalFormLabel',
        rules: {
          required: true,
        },
      },
      administrativeFees: {
        name: 'administrativeFees',
        type: 'input-group',
        isDisabled: true,
        col: 'col-12 pb-3',
        label: 'customer.administrativeFees', //saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        //  labelStyle: 'boldFormLabel fs-5',
        subModel: {
          TotalShipmentWeightInTons: {
            type: 'number',
            value: customerRequest ? customerRequest.weightInTon : 0,
            col: this.currentLang === 'ar' ? 'col-12 mb-3 ps-0' : 'col-12 pe-0',
            label: 'customer.TotalShipmentWeightInTons',
            labelStyle: 'normalFormLabel',
            labelCol: 'col-4',
            rules: {
              required: true,
            },
          },
          pricePerTon: {
            type: 'number',
            value: customerRequest ? customerRequest.pricePerTon : 0,
            isDisable:
              Iscustomer && customerRequest.status == 'AcceptProtectEEA',
            col: this.currentLang === 'ar' ? 'col-12 mb-3 ps-0' : 'col-12 pe-0',
            label: 'customer.pricePerTon',
            labelStyle: 'normalFormLabel',
            labelCol: 'col-4',
            rules: {
              required: true,
            },
          },
          currencyId: {
            label: 'admissionForm.currency',
            value: customerRequest ? customerRequest.currencyId : 0,
            isDisable:
              Iscustomer && customerRequest.status == 'AcceptProtectEEA',
            col: 'col pb-3',
            type: 'select',
            options: this.currencyList,
            checker: {
              fieldName: 'coalCurrencyChecker',
              type: 'checkbox',
              value: false,
            },
            rules: {
              required: true,
            },
          },
          administrativeFeePercentage: {
            type: 'number',
            value: requestFees ? requestFees.ratioEdaraFee : '',
            isDisable:
              Iscustomer && customerRequest.status == 'AcceptProtectEEA',
            col: this.currentLang === 'ar' ? 'col-12 mb-3 ps-0' : 'col-12 pe-0',
            label: 'customer.administrativeFeePercentage',
            labelStyle: 'normalFormLabel',
            labelCol: 'col-4',
            rules: {
              required: true,
            },
          },
          todayCurrencyValue: {
            type: 'number',
            value: requestFees ? (requestFees.rate ? requestFees.rate : 1) : 1,
            col: this.currentLang === 'ar' ? 'col-6 mb-3 ps-0' : 'col-12 pe-0',
            label: 'customer.todayCurrencyValue',
            labelStyle: 'normalFormLabel',
            labelCol: 'col-auto',
            rules: {
              required: true,
            },
          },
          rdfTotal: {
            type: 'number',
            value: requestFees ? requestFees.rdfTotal : 0,
            col: this.currentLang === 'ar' ? 'col-6 mb-3 ps-0' : 'col-12 pe-0',
            label: 'customer.rdfValue',
            labelStyle: 'normalFormLabel',
            labelCol: 'col-auto',
            rules: {
              required: true,
            },
          },
          totalRequest: {
            type: 'number',
            value: requestFees ? requestFees.totalFee : 0,
            col: this.currentLang === 'ar' ? 'col-6 mb-3 ps-0' : 'col-12 pe-0',
            label: 'customer.feeValue',
            labelStyle: 'normalFormLabel',
            labelCol: 'col-auto',
            rules: {
              required: true,
            },
          },
          date: {
            type: 'date',
            value: requestFees ? requestFees.createdDate : '',
            col: this.currentLang === 'ar' ? 'col-6 mb-3 ps-0' : 'col-12 pe-0',
            label: 'customer.date',
            labelStyle: 'normalFormLabel',
            labelCol: 'col-auto',
            rules: {
              required: true,
            },
          },
        },
      },
    });
  }
}
