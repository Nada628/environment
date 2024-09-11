export interface CardData {
  title: string;
  description: string;
  url: string;
}

export interface ServiceCard extends CardData {
  urlHover: string;
  path: string;
}

export interface SwiperContent extends CardData {}

export interface NotificationCard {
  title: string;
  applicationNumber: number;
  office: string;
  acceptanceStatus: string;
  orderDate: string;
}
export interface TotalRequestsCard {
  status: string;
  percentage: number;
  background: string;
  color: string;
  progressBarClass: string;
}
export interface totalCard {
  title: string;
  number: number;
  currency: string;
}

export interface PaymentDetailsCard {
  name: string;
  value: any;
}
