import { ApiResponse } from './api-response.model';
import { CompanyType } from './company-type';
import { Attachement } from './input.model';

export interface CompanyResponse extends ApiResponse {
  content?: Company[];
}

export interface Company {
  name?: string;
  manager_name?: string;
  type_id?: number;
  commercial_record_number?: string;
  tax_record_number?: string;
  acceptEEA?: boolean;
  accept_eea_number?: number;
  address?: string;
  attachments?: Attachement[];
  companyType?: CompanyType;
  email?: string;
  id?: number;
  import_card_number?: string;
  industry_record_number?: string;
  ownerId?: number;
  phone_number?: string;
  purpose?: string;
  quota?: number;
  status?: string;
}
