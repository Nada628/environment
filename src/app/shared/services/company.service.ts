import { Injectable } from '@angular/core';
import { MenutItem } from 'app/core/layout/models/menu-header.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor() {}

  addCompanyForm = {
    fields: {
      companyName: {
        label: 'addCompanyForm.companyName',
        value: '',
        col: 'col-md-6 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      companyApproval: {
        type: 'file',
        value: '',
        col: 'col-md-6 col-12',
        label: 'addCompanyForm.companyApproval',
        rules: {
          required: true,
        },
      },
      envApprovalNo: {
        label: 'addCompanyForm.envApprovalNo',
        value: '',
        col: 'col-md-3 col-12',
        type: 'text',
        rules: {
          required: true,
        },
      },
      envApprovalAttach: {
        label: 'addCompanyForm.envApprovalNo',
        value: '',
        col: 'col-md-3 col-12',
        type: 'file',
        rules: {
          required: true,
        },
      },
      expiration: {
        type: 'date',
        value: '',
        col: 'col-md-6 col-12',
        label: 'addCompanyForm.expiration',
        rules: {
          required: true,
        },
      },
    },
  };
}
