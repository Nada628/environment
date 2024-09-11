export interface RegisterCompanyRequest {
  name: string;
  manager_name: string;
  company_type_id: number;
  activity_id: number;
  purpose_of_use: string;
  address: string;
  city_id?: number;
  phone: string;
  code: string;
  email: string;
  tax_registration_number: string;
  tax_registration_file?: any; 
  tax_registration_from?: string;
  tax_registration_to?: string;
  tax_card_number: string;
  tax_card_file?: any;
  tax_card_from?: string;
  tax_card_to?: string;
  industrial_registration_number: string;
  industrial_registration_file: any;
  industrial_registration_from: string;
  industrial_registration_to: string;
  environmental_approval_data: any;
  // environmental_date: string;
  // lat: string;
  // lan: string;
  // permit_status_number: string;
  // status_from: string;
  // status_to: string;
  status_file: any;
  quota: number;
  quota_valid_from: string;
  quota_valid_to: string;

  // userId?: number;
  // ownerId?: number;
  // import_card_number: string;
  // attachments: AttachmentRequestBody[];
}

export interface EditCompanyRequest extends RegisterCompanyRequest {}