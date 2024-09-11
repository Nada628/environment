import { Attachement } from './input.model';

export class RequestDetail {
  coalTypeId: number;
  landingHarborId: number;
  harborIds: number[];
  companyId: number;
  industrialRegister: string;
  amountOfCoalPlanInTon: number;
  otherAttachment: any[];
}
