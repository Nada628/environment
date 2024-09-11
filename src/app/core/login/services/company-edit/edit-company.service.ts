import { Injectable } from '@angular/core';
import { EditCompanyRequest } from '@login/model/register-company.model';

@Injectable({
  providedIn: 'root',
})
export class EditCompanyService {
  editCompanyRequest: EditCompanyRequest;
  constructor() {}

  mapRegisterCompanyData(formData) {
    return (this.editCompanyRequest = {
      name: formData.name,
      manager_name: formData.manager_name,
      company_type_id: Number(formData.company_type_id),
      tax_registration_number: formData.tax_registration_number,
      tax_registration_file: formData.tax_registration_file.attach,
      tax_registration_from: formData.tax_registration_file.from,
      tax_registration_to: formData.tax_registration_file.to,
      activity_id: Number(formData.activity_id),
      tax_card_number: formData.tax_card_number,
      tax_card_from: formData.tax_card_file.from,
      tax_card_to: formData.tax_card_file.to,
      tax_card_file: formData.tax_card_file.attach,
      purpose_of_use: formData.purpose,
      industrial_registration_number: formData.industrial_registration_number,
      industrial_registration_file: formData.industrial_registration_file.attach,
      industrial_registration_from: formData.industrial_registration_file.from,
      industrial_registration_to: formData.industrial_registration_file.to,
      address: formData.address,
      code: formData.city_code,
      city_id: formData.gov_id, 
      environmental_approval_data: formData.environmental_approval_file,
      // environmental_date: formData.accept_eea_papre.release_date,
      // lat: formData.accept_eea_papre.xCoordinate,
      // lan: formData.accept_eea_papre.yCoordinate,
      phone: formData.phone_number,
      permit_status_number: formData.import_card_number,
      // status_from: formData.import_card_paper.from,
      // status_to: formData.import_card_paper.to,
      status_file: formData.import_card_paper.attach,
      email: formData.email,
      quota: Number(formData.quota),
      quota_valid_from: formData.quota_valid_from,
      quota_valid_to: formData.quota_valid_to,
    });
  }
}
