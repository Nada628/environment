import { ApiResponse } from './api-response.model';

export interface CompanyTypeResponse extends ApiResponse {
  content?: CompanyType[];
}

export interface CompanyType {
  id?: number;
  code: string;
  name: string;
}
