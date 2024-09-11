export interface ExpensesRequest {
  edaraFees: number;
  totalTon: number;
  tonPrice: number;
  currencyId: number;
  ratioEdaraFee: number;
  requestId: number;
  currencyRate?: CurrencyRate;
  rdfTotal: number;
  totalFee: number;
}

export interface CurrencyRate {
  rate: number;
  currencyId: number;
  date: Date;
}
