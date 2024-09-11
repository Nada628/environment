import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterCompanyService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  mapRegisterCompanyData(formData): FormData {
    const form = new FormData();

    // Append simple fields
    form.append('name', formData.name);
    form.append('manager_name', formData.manager_name);
    form.append('company_type_id', String(formData.company_type_id));
    form.append('activity_id', String(formData.activity_id));
    form.append('purpose_of_use', formData.purpose_of_use);
    form.append('address', formData.address);
    form.append('city_id', String(formData.city_id));
    form.append('phone', formData.phone);
    form.append('code', formData.code);
    form.append('email', formData.email);
    form.append(
      'industrial_registration_number',
      formData.industrial_registration_number
    );

    // Append industrial registration file if it's a File object
    if (formData.industrial_registration_file instanceof File) {
      form.append(
        'industrial_registration_file',
        formData.industrial_registration_file,
        formData.industrial_registration_file.name
      );
    } else {
      console.error(
        'industrial_registration_file is not a File object:',
        formData.industrial_registration_file
      );
    }

    form.append(
      'industrial_registration_from',
      formData.industrial_registration_from
    );
    form.append(
      'industrial_registration_to',
      formData.industrial_registration_to
    );

    // Append environmental approval data
    if (formData.environmental_approval_data) {
      for (let i = 0; i < formData.environmental_approval_data.length; i++) {
        const file = formData.environmental_approval_data[i].file;

        if (file instanceof File) {
          form.append(
            `environmental_approval_data[${i}][file]`,
            file,
            file.name
          );
        } else {
          console.error(
            `environmental_approval_data[${i}].file is not a File object:`,
            file
          );
        }

        form.append(
          `environmental_approval_data[${i}][environmental_approval_num]`,
          formData.environmental_approval_data[i].environmental_approval_num
        );
        form.append(
          `environmental_approval_data[${i}][date]`,
          formData.environmental_approval_data[i].date
        );
        form.append(
          `environmental_approval_data[${i}][lat]`,
          formData.environmental_approval_data[i].lat
        );
        form.append(
          `environmental_approval_data[${i}][lan]`,
          formData.environmental_approval_data[i].lan
        );
      }
    }

    // Append status files
    if (formData.status_file) {
      for (let i = 0; i < formData.status_file.length; i++) {
        const statusFile = formData.status_file[i].status_file;

        if (statusFile instanceof File) {
          form.append(
            `status_file[${i}][status_file]`,
            statusFile,
            statusFile.name
          );
        } else {
          console.error(
            `status_file[${i}].status_file is not a File object:`,
            statusFile
          );
        }

        form.append(
          `status_file[${i}][approve_number]`,
          formData.status_file[i].approve_number
        );
        form.append(`status_file[${i}][from]`, formData.status_file[i].from);
        form.append(`status_file[${i}][to]`, formData.status_file[i].to);
      }
    }

    // Append quota fields
    form.append('quota', String(formData.quota));
    form.append('quota_from', formData.quota_from);
    form.append('quota_to', formData.quota_to);

    return form;
  }

  registerCompany(formData) {
    const apiUrl = `${this.baseUrl}company`;
    const form = this.mapRegisterCompanyData(formData);
    console.log('registerCompany', form);

    return this.httpClient.post(apiUrl, form);
  }

  editCompany(companyId, formData) {
    const apiUrl = `${this.baseUrl}company/update/${companyId}`;
    const form = this.mapRegisterCompanyData(formData);
    console.log('editCompany', form);

    return this.httpClient.post(apiUrl, form);
  }

  getCompanyById(id) {
    const apiUrl = `${this.baseUrl}company/${id}`;
    return this.httpClient.get(apiUrl);
  }
}
