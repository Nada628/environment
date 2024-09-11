import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerRegisterationFormSerivce {
  customerRegisterationFormModel;

  constructor() {
    this.init();
  }

  init(requestType?) {
    this.customerRegisterationFormModel = {
      username: {
        label: 'customerRegisterFrom.userName',
        value: '',
        col: 'col-md-6 col-12',
        type: 'text',
        rules: {
          required: true,
          userName: true
        },
      },
      name: {
        label: 'customerRegisterFrom.name',
        value: '',
        col: 'col-md-6 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      password: {
        type: 'password',
        value: '',
        col: 'col-md-6 col-12',
        label: 'customerRegisterFrom.password',
        rules: {
          required: true,
          password: true
        },
      },
      confirmPassword: {
        type: 'password',
        value: '',
        col: 'col-md-6 col-12',
        label: 'customer.confirmPassword',
        rules: {
          required: true,
          confirmedPassword: true,
        },
      },
      email: {
        label: 'customerRegisterFrom.email',
        value: '',
        col: 'col-md-6 col-12',
        type: 'text',
        rules: {
          required: true,
          email: true
        },
      },
      registerType: {
        label: 'customerRegisterFrom.RegisterType',
        value: '',
        col: 'col-md-6 col-12',
        type: 'select',
        options: requestType,
        rules: {
          required: true,
        },
      },
    };
    return this.customerRegisterationFormModel;
  }
}
