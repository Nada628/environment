import { AttachmentRequestBody } from '@shared/model/attachment-request-body.model';

export interface ValidateCompanyRequest  {
  customerName: string;
  email: string;
  job: string;
  commercial_record_number: number;
  commercial_record_doc: File;
  commercial_record_from: Date;
  commercial_record_to: Date;
  phoneNumber: string;
  tax_record_number: string;
  tax_record_doc?: File;
  tax_record_from?: Date;
  tax_record_to?: Date;
  nationalNumber: number;
  nationalDoc: number;
  nationalFrom: number;
  nationalTo: number;
  companyId?: number;
  // attachments: AttachmentRequestBody[];
}
