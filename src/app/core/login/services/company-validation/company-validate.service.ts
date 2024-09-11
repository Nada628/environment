import { Injectable } from '@angular/core';
import { ValidateCompanyRequest } from '@login/model/validate-company.model';
import { BehaviorSubject } from 'rxjs';
import { Company } from '@shared/model/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyValidationSerivce {
  private initialCompany: Company = {};
  private selectedCompanyId;
  private companiesList;
  selectedCompany = new BehaviorSubject<Company>(this.initialCompany);
  validateCompanyRequest: ValidateCompanyRequest;

  constructor() {}

  mapValidateCompanyData(formData): FormData {
    const form = new FormData();

    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('job', formData.position);
    form.append('commercial_number', formData.comRegisterNum);

    if (formData.COMMERCIAL_NUMBER_PAPER.COMMERCIAL_NUMBER_PAPER) {
      form.append(
        'commercial_file',
        formData.COMMERCIAL_NUMBER_PAPER.COMMERCIAL_NUMBER_PAPER,
        formData.COMMERCIAL_NUMBER_PAPER.COMMERCIAL_NUMBER_PAPER.name
      );
    }

    form.append(
      'commercial_from',
      formData.COMMERCIAL_NUMBER_PAPER.from
    );
    form.append('commercial_to', formData.COMMERCIAL_NUMBER_PAPER.to);
    form.append('phone_number', formData.phone_number);
    form.append('tax_number', formData.tax_record_number);

    if (formData.TAX_REGISTER_DOC.TAX_REGISTER_DOC) {
      form.append(
        'tax_file',
        formData.TAX_REGISTER_DOC.TAX_REGISTER_DOC,
        formData.TAX_REGISTER_DOC.TAX_REGISTER_DOC.name
      );
    }

    form.append('tax_from', formData.TAX_REGISTER_DOC.from);
    form.append('tax_to', formData.TAX_REGISTER_DOC.to);
    form.append('national_number', formData.nationalId);

    if (formData.NATIONAL_ID.NATIONAL_ID) {
      form.append(
        'id_file',
        formData.NATIONAL_ID.NATIONAL_ID,
        formData.NATIONAL_ID.NATIONAL_ID.name
      );
    }

    form.append('id_from', formData.NATIONAL_ID.from);
    form.append('id_to', formData.NATIONAL_ID.to);

    return form;
  }

  public set _companiesList(companies) {
    this.companiesList = companies;
  }

  public set _selectedCompanyId(companyId) {
    this.selectedCompanyId = companyId;
    this.setSelectedCompany();
  }

  public get getSelectedCompany() {
    return this.selectedCompanyId;
  }

  setSelectedCompany() {
    let company = this.companiesList.find(
      (company) => company.id == this.selectedCompanyId
    );
    if (company) this.selectedCompany.next(company);
  }
}
