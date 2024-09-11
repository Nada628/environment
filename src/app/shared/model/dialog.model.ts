export interface DialogOptions {
  title: string;
  type?: string;
  selectedOption?: string;
  message?: string;
  selectedRow?: {};
  buttons?: ButtonsList[];
  width?: number;
  height?: number;
}

export interface ButtonsList {
  btnName: string;
  btnCss: string;
  additionalCss?: string;
  action: string;
}
