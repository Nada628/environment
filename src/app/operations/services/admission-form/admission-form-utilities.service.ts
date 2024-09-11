import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/model/api-response.model';
import { environment } from 'environments/environment.prod';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmissionFormUtilitiesService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getCurrency() {
    const url = this.baseUrl + 'currency';
    return this.http.get<ApiResponse>(url);
  }

  getUnloadType() {
    const url = this.baseUrl + 'unload-type';
    return this.http.get(url);
  }

  getCountry() {
    const url = this.baseUrl + 'countries';
    return this.http.get(url);
  }

  getHarborList() {
    const url = this.baseUrl + 'harbor';
    return this.http.get(url);
  }

  getCoalType() {
    const url = this.baseUrl + 'coal/types';
    return this.http.get(url);
  }
  getPlantCoalType() {
    const url = this.baseUrl + 'coal/types';
    return this.http.get(url);
  }

  getUnloadMethod() {
    const url = this.baseUrl + 'unload-company';
    return this.http.get(url);
  }

  getStoreCompany() {
    const url = this.baseUrl + 'store-company';
    return this.http.get(url);
  }

  getCentralStoreCompany() {
    const url = this.baseUrl + 'centeral-store-company';
    return this.http.get(url);
  }

  getTransportCompany() {
    const url = this.baseUrl + 'transport-company';
    return this.http.get(url);
  }

  getRiverCompany() {
    const url = this.baseUrl + 'river-company';
    return this.http.get(url);
  }

  getImportCoalCompany() {
    const url = this.baseUrl + 'import-coal-company';
    return this.http.get(url);
  }

  getAllCompanies() {
    const url = this.baseUrl + 'company';
    return this.http.get(url);
  }

  mapCustomerRequestData(formData): FormData {
    const form = new FormData();

    form.append('country_id', formData.country_id);
    form.append('company_id', formData.company_id);
    form.append('incoming_harbor_id', String(formData.incoming_harbor_id));
    form.append('Shipment_date', String(formData.Shipment_date));
    form.append('arrival_harbor_id', formData.arrival_harbor_id);
    form.append('ship_name', formData.ship_name);
    form.append('arrival_date', formData.arrival_date);
    form.append('total_weight_ton', formData.total_weight_ton);
    form.append('ton_price_num', formData.ton_price_num);
    form.append('ton_price_char', formData.ton_price_char);
    form.append('currency_id', formData.currency_id);
    form.append('coal_id', formData.coal_id);
    form.append('coal_price_num', formData.coal_price_num);
    form.append('coal_price_char', formData.coal_price_char);
    form.append('ton_currency_id', formData.ton_currency_id);

    form.append('import_coal_company_id', formData.import_coal_company_id);
    form.append('unload_type_id', formData.unload_type_id);

    form.append('transfer_steps', formData.transfer_steps);
    form.append('expenses_approval', formData.expenses_approval);
    form.append('commissioner_approval', formData.commissioner_approval);
    form.append('hook_approval', formData.hook_approval);

    if (formData.invoice_file) {
      form.append(
        'invoice_file',
        formData.invoice_file,
        formData.invoice_file.name
      );
    }
    if (formData.noteinsurance_policy_file) {
      form.append(
        'noteinsurance_policy_file',
        formData.noteinsurance_policy_file,
        formData.noteinsurance_policy_file.name
      );
    }
    if (formData.contract_file) {
      form.append(
        'contract_file',
        formData.contract_file,
        formData.contract_file.name
      );
    }
    if (formData.registration_data_file) {
      form.append(
        'registration_data_file',
        formData.registration_data_file,
        formData.registration_data_file.name
      );
    }
    if (formData.hook_approval_file) {
      form.append(
        'hook_approval_file',
        formData.hook_approval_file,
        formData.hook_approval_file.name
      );
    }

    if (formData.iunload_company_data) {
      for (let i = 0; i < formData.iunload_company_data.length; i++) {
        form.append(
          'iunload_company_data[' + i + '][unload_company_approval_file]',
          formData.iunload_company_data[i].unload_company_approval_file,
          formData.iunload_company_data[i].unload_company_approval_file.name
        );

        // form.append(
        //   'iunload_company_data[' + i + '][iunload_approval_attach]',
        //   formData.iunload_company_data[i].iunload_approval_attach,
        //   formData.iunload_company_data[i].iunload_approval_attach.name
        // );

        form.append(
          'iunload_company_data[' + i + '][iunload_company_id]',
          formData.iunload_company_data[i].iunload_company_id
        );

        // form.append(
        //   'iunload_company_data[' + i + '][iunload_approval_num]',
        //   formData.iunload_company_data[i].iunload_approval_num
        // );

        // form.append(
        //   'iunload_company_data[' + i + '][iunload_approval_date]',
        //   formData.iunload_company_data[i].iunload_approval_date
        // );
      }
    }

    if (formData.transport_company_data) {
      for (let i = 0; i < formData.transport_company_data.length; i++) {
        form.append(
          'transport_company_data[' + i + '][transport_company_approval_file]',
          formData.transport_company_data[i].transport_company_approval_file,
          formData.transport_company_data[i].transport_company_approval_file
            .name
        );

        // form.append(
        //   'transport_company_data[' + i + '][transport_approval_attach]',
        //   formData.transport_company_data[i].transport_approval_attach,
        //   formData.transport_company_data[i].transport_approval_attach.name
        // );

        form.append(
          'transport_company_data[' + i + '][transport_company_id]',
          formData.transport_company_data[i].transport_company_id
        );

        // form.append(
        //   'transport_company_data[' + i + '][transport_approval_num]',
        //   formData.transport_company_data[i].transport_approval_num
        // );

        // form.append(
        //   'transport_company_data[' + i + '][transport_approval_date]',
        //   formData.transport_company_data[i].transport_approval_date
        // );
      }
    }

    if (formData.store_company_data) {
      for (let i = 0; i < formData.store_company_data.length; i++) {
        form.append(
          'store_company_data[' + i + '][store_company_approval_file]',
          formData.store_company_data[i].store_company_approval_file,
          formData.store_company_data[i].store_company_approval_file.name
        );

        // form.append(
        //   'store_company_data[' + i + '][store_approval_attach]',
        //   formData.store_company_data[i].store_approval_attach,
        //   formData.store_company_data[i].store_approval_attach.name
        // );

        form.append(
          'store_company_data[' + i + '][store_company_id]',
          formData.store_company_data[i].store_company_id
        );

        // form.append(
        //   'store_company_data[' + i + '][store_approval_num]',
        //   formData.store_company_data[i].store_approval_num
        // );

        // form.append(
        //   'store_company_data[' + i + '][store_approval_date]',
        //   formData.store_company_data[i].store_approval_date
        // );
      }
    }

    if (formData.centeral_store_company_data) {
      for (let i = 0; i < formData.centeral_store_company_data.length; i++) {
        form.append(
          'centeral_store_company_data[' +
            i +
            '][centeral_store_approval_file]',
          formData.centeral_store_company_data[i].centeral_store_approval_file,
          formData.centeral_store_company_data[i].centeral_store_approval_file
            .name
        );

        // form.append(
        //   'centeral_store_company_data[' + i + '][centeral_approval_attach]',
        //   formData.centeral_store_company_data[i].centeral_approval_attach,
        //   formData.centeral_store_company_data[i].centeral_approval_attach.name
        // );

        form.append(
          'centeral_store_company_data[' + i + '][centeral_store_company_id]',
          formData.centeral_store_company_data[i].centeral_store_company_id
        );

        // form.append(
        //   'centeral_store_company_data[' + i + '][centeral_approval_num]',
        //   formData.centeral_store_company_data[i].centeral_approval_num
        // );

        // form.append(
        //   'centeral_store_company_data[' + i + '][centeral_approval_date]',
        //   formData.centeral_store_company_data[i].centeral_approval_date
        // );
      }
    }

    if (formData.river_company_data) {
      for (let i = 0; i < formData.river_company_data.length; i++) {
        form.append(
          'river_company_data[' + i + '][river_company_approval_file]',
          formData.river_company_data[i].river_company_approval_file,
          formData.river_company_data[i].river_company_approval_file.name
        );

        // form.append(
        //   'river_company_data[' + i + '][river_approval_attach]',
        //   formData.river_company_data[i].river_approval_attach,
        //   formData.river_company_data[i].river_approval_attach.name
        // );

        form.append(
          'river_company_data[' + i + '][river_company_id]',
          formData.river_company_data[i].river_company_id
        );

        // form.append(
        //   'river_company_data[' + i + '][river_approval_num]',
        //   formData.river_company_data[i].river_approval_num
        // );

        // form.append(
        //   'river_company_data[' + i + '][river_approval_date]',
        //   formData.river_company_data[i].river_approval_date
        // );
      }
    }

    return form;
  }
  sentReq(formData) {
    const apiUrl = this.baseUrl + 'create/client/request';
    // const form = this.mapCustomerRequestData(formData);

    // console.log('sentReq', form);

    return this.http.post(apiUrl, formData);
  }
  sentReqWithoutRdf(formData) {
    const apiUrl = this.baseUrl + 'create/client/request';
    const form = this.mapCustomerRequestData(formData);

    console.log('sentReq with rdf', form);

    return this.http.post(apiUrl, form);
  }

  mapRdfDataH(secData:any) {
     const formData = new FormData();
    const formValue = secData;
    console.log(secData);
    
    Object.keys(formValue).forEach((key:any) => {
      const value = formValue[key];
      
      // If the value is a file, you may need to handle it differently
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });
    console.log(formData);
    
    return formData;
  }

  sentRdfReq(formData) {
    const apiUrl = this.baseUrl + 'rdf';
    // const form = this.mapRdfData(formData);

    console.log('sentReq', formData);

    return this.http.post(apiUrl, formData);
  }

  checkRDF() {
    const apiUrl = this.baseUrl + 'activity/check/rdf';
    return this.http.get(apiUrl);
  }
  private reqFormData: any;

  // Store the first form data
  requestFormData(data: any) {
    this.reqFormData = this.mapCustomerRequestData(data);
    console.log('ReqFormData', this.reqFormData);
    
  }

  // Submit the first form and then the second form
  requestRDFData(secondFormData: any): Observable<any> {
    return this.sentReq(this.reqFormData).pipe(
      switchMap((res) => {
        return this.sentRdfReq(this.mapRdfDataH(secondFormData));
      }),
      map((res) => {
        return { msg: res['msg'], status: true };
      }),
      catchError((err) => {
        console.log('Error in form submission:', err);
        return of({ msg: err['msg'], status: false });
      })
    );
     
  }

  
}
