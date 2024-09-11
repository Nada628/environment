import { Injectable } from '@angular/core';
import { PaymentDetailsCard } from '@shared/model/card-data.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentSuccessService {
  paymentDetails: PaymentDetailsCard[];
  formModel;
  constructor() {
    this.paymentDetails = [
      {
        name: 'companyRegistrationForm.companyName',
        value: 'كينج ستون',
      },
      {
        name: 'customer.orderNumber',
        value: 333,
      },
      {
        name: 'tableHeader.orderDate',
        value: '12/3/2023',
      },
      {
        name: 'customer.paymentDate',
        value: '12/3/2023',
      },
      {
        name: 'customer.eFinanceNumber',
        value: 444,
      },
      {
        name: 'customer.serviceName',
        value: 'طلب تفريغ شحنة',
      },
      {
        name: 'customer.feeValue',
        value: 200,
      },
    ];

    this.formModel = {
      receiptNumber: {
        type: 'number',
        value: null,
        col: 'col-md-4 col-12 pb-3',
        label: 'customer.receiptNumber',
        labelCol: 'col-4',
        rules: {
          required: true,
        },
      },
      receiptDate: {
        type: 'date',
        value: null,
        col: 'col-md-4 col-12 pb-3',
        label: 'customer.receiptDate',
        labelCol: 'col-4',
        rules: {
          required: true,
        },
      },
      receiptImg: {
        type: 'file',
        value: null,
        col: 'col-md-4 col-12 pb-3',
        label: 'customer.receiptImg',
        labelCol: 'col-4',
        rules: {
          required: true,
        },
      },
    };
  }
}
