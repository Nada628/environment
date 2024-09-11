import { ApiResponse } from './api-response.model';

export interface ActivityTypeResponse extends ApiResponse {
  content?: ActivityType[];
}

export interface ActivityType {
  id: number;
  code: string;
  name: string;
  description: string;
  userId: number;
}
