import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WasteManagementAdmissionFormService {
  customerData;
  reviewersList;
  statusArr;
  statusNote;
  constructor() {
    this.customerData = {
      orderNumber: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'customer.orderNumber',
        rules: {
          required: true,
        },
      },
      orderDate: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'tableHeader.orderDate',
        rules: {
          required: true,
        },
      },
      companyName: {
        type: 'text',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'companyRegistrationForm.companyName',
        rules: {
          required: true,
        },
      },
      totalShipmentWeight: {
        type: 'number',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'admissionForm.totalShipmentWeight',
        rules: {
          required: true,
        },
      },
      dateOfShipment: {
        type: 'date',
        value: '',
        col: 'col-md-6 col-12 pb-3',
        label: 'customer.dateOfShipment',
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
    this.reviewersList = [
      {
        name: 'مصطفي محمد 1',
      },
      {
        name: 'مصطفي محمد 2',
      },
      {
        name: 'مصطفي محمد 3',
      },
      {
        name: 'مصطفي محمد 4',
      },
      {
        name: 'مصطفي محمد 5',
      },
      {
        name: 'مصطفي محمد 6',
      },
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
  }
}
