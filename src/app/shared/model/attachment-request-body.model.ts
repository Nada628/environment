export interface AttachmentRequestBody {
  id: number;
  fileField: string;
  validFromDate?: string;
  validToDate?: string;
  url?: string;
}
