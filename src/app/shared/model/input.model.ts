export interface Input {
  label: string;
  value: any;
  col: string;
  type: string;
  id?: any;
  rules: rule;
  checker?: Checker;
}

export interface Checker {
  fieldName: string;
  value: any;
  type: string;
}

export interface SelectBox extends Input {
  addCompany?: boolean;
  options: Option[];
}

export interface Attachement extends Input {
  addButton?: boolean;
  addButtonCol?: string;
  requiredDocument?: string;
}

export interface InputGroup {
  name: string;
  type: string;
  col: string;
  checker?: Checker;
}

export interface Option {
  id?: number;
  name?: string;
  label: string;
  value: number;
  class?: string;
}

export interface Checkbox {
  label: string;
  value: boolean;
  type: string;
}

export interface rule {
  required: boolean;
  maxValue?: number;
}

export interface baseField {
  col: string;
  fieldName: string;
  label: string;
  options?: Option[];
  id?: number;
  rules: rule;
  type: string;
  value: string;
  addButton?: boolean;
  checker?: Checker;
  border?: string;
  requiredDocument?: string;
  labelCol?: string;
  addCompany: boolean;
  isDisabled: boolean;
  nullOption: boolean;
  max: number;
}
export interface Field extends baseField {
  subFields?: baseField[];
}
