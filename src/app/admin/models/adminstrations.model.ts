import { ApiResponse } from '@shared/model/api-response.model';

export interface Adminstration {
  id: number;
  name: string;
  description: string;
  parentId?: number;
}
export interface AdminstrationResponse extends ApiResponse {
  items: Adminstration[];
}
