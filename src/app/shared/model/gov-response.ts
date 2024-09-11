import { ApiResponse } from './api-response.model';

export interface GovResponse extends ApiResponse {
  content?: Governerate[];
}

export interface Governerate {
  id?: number;
  code: string;
  name: string;
  countryId: number;
  country: Country;
}

export interface Country {
  id?: number;
  code: string;
  name: string;
}
