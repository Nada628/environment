import { HttpClient } from '@angular/common/http';
import { ServiceEvaluationForm } from './../models/customerForm.model';
import { Injectable } from '@angular/core';
import { DropDownItem } from '@shared/model/dropDown.model';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ServiceEvaluationService {
  baseUrl: string;
  dropDownList: DropDownItem[];
  formModel: ServiceEvaluationForm;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
    this.dropDownList = [
      {
        name: 'Category 1',
      },
      {
        name: 'Category 2',
      },
      {
        name: 'Category 3',
      },
      {
        name: 'Category 4',
      },
      {
        name: 'Category 5',
      },
      {
        name: 'Category 6',
      },
    ];

    this.formModel = {
      suggestion: {
        type: 'textArea',
        value: '',
        col: 'col-md-6 col-12 my-5',
        label: 'customer.suggestionsToImproveTheLevelOfService',
        rules: {
          required: true,
        },
      },
    };
  }

  sendingEvaluation(rating) {
    let evaluationObj = {
      ...rating,
      serviceId: null,
    };
    const url = this.baseUrl + '/portal-data/rating';
    return this.http.post(url, evaluationObj);
  }
}
