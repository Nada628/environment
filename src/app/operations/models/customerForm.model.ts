import {
  Attachement,
  Checkbox,
  Input,
  InputGroup,
  SelectBox,
} from '@shared/model/input.model';

export interface MainModel {
  sourceCountryId: SelectBox;
  importHarborId: Input;
  shipDate: Input;
  landingHarborId: SelectBox;
  shipName: Input;
  arrivedDate: Input;
  weightInTon: Input;
  shipmentWeight: ShipmentWeight;
  coalTypeId: SelectBox;
  totalPrice: Input;
  totalPriceInChar: Input;
  currencyId: SelectBox;
  importCoalCompany: Input;
  unLoadWayId: SelectBox;
  companyId: SelectBox;
  shipmentStages: Input;
  UNLOAD_ACCEPT_PAPER: AdmissionFormCompanyDetails;
  STORE_ACCEPT_PAPER: AdmissionFormCompanyDetails;
  TRANSPORT_ACCEPT_PAPER: AdmissionFormCompanyDetails;
  STORE_INTERMEDIATE_PAPER: AdmissionFormCompanyDetails;
  HARBOR_LANDING_RIVER: AdmissionFormCompanyDetails;
}

export interface DocumentModel {
  INSURANCE_POLICR: Attachement;
  COMPANY_CONTRACT_COAL: Attachement;
  SHIP_REGISTRY: Attachement;
}

export interface CaseModel {
  HOOK_ACCEPT_PAPER: Attachement;
}

export interface DigitalSealModel {
  confirmPayment: Checkbox;
  confirmAgentExist: Checkbox;
  confirmHookUsed: Checkbox;
}

export interface ShipmentWeight extends InputGroup {
  subModel: {
    pricePerTonChar: Input;
    pricePerTon: Input;
    currencyId: SelectBox;
    invoice: Attachement;
  };
}

export interface AdmissionFormCompanyDetails {
  name: string;
  type: string;
  col: string;
  border: string;
  checker?: {
    fieldName: string;
    value: boolean;
    type: string;
    rules: {
      required: boolean;
    };
  };
  subModel: {
    id: Input;
    companyId: SelectBox;
    addCompany?: boolean;
    companyAcceptance: Input;
    companyAcceptanceNumber: Input;
    acceptDate: Input;
    otherAttachment: Attachement;
  };
}

export interface ComplainsForm {
  complaint: Input;
  responsesToPreviousInquiries: Input;
}
export interface ServiceEvaluationForm {
  suggestion: Input;
}
