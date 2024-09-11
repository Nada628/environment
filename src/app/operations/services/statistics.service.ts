import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationCard } from '@shared/model/card-data.model';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  baseUrl: string;
  notificationCards: NotificationCard[];

  TotalForAllStatus;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;

    this.getTotalRequestCards({
      acceptedRequests: 5,
      underReviewRequests: 3,
      rejectedRequests: 2,
    });
    this.notificationCards = [
      {
        title: 'customer.requestingCoalShipments',
        applicationNumber: 3225,
        office: 'customer.investorServiceOffice',
        acceptanceStatus: 'acceptanceStatus',
        orderDate: 'On Saturday,17/9/2022',
      },
    ];
  }

  getTotalRequestCards(percentageObj) {
    let totalRequestsCards = [
      {
        status: 'customer.accepted',
        percentage: percentageObj.acceptedRequests,
        background: '#CCE2F3',
        color: '#045FA4',
        progressBarClass: 'blue-gradient',
      },
      {
        status: 'customer.underReview',
        percentage: percentageObj.underReviewRequests,
        background: '#F9F0CE',
        color: '#DFB50B',
        progressBarClass: 'yellow-gradient',
      },
      {
        status: 'customer.rejected',
        percentage: percentageObj.rejectedRequests,
        background: '#FFCCCC',
        color: '#FF0000',
        progressBarClass: 'red',
      },
    ];
    return totalRequestsCards;
  }

  getTotals(TotalExpensesPaid) {
    let totals = [
      {
        title: 'customer.TotalExpensesPaid',
        number: TotalExpensesPaid,
        currency: 'admissionForm.egp',
      },
      {
        title: 'customer.totalExpensesToBePaid',
        number: 2214,
        currency: 'admissionForm.egp',
      },
    ];

    return totals;
  }
  setNotification(notificationCards1: any[]) {
    this.notificationCards = [];
    notificationCards1.forEach((element) => {
      let notificationCard: NotificationCard;
      notificationCard = {
        title: element.requestType.name,
        applicationNumber: element.id,
        office: '',
        acceptanceStatus: element.status,
        orderDate: element.createdDate,
      };

      this.notificationCards.push(notificationCard);
    });
  }

  getChartCardsArr(statisicsObj) {
    let chartCardsArr = [
      {
        header: 'customer.totalWeeklyOrders',
        from: '22/4/2023',
        to: '22/4/2023',
        chardData: {
          datasets: [
            {
              label: 'Weekly',
              data: [
                statisicsObj.weeklyObj.acceptedRequests,
                statisicsObj.weeklyObj.underReviewRequests,
                statisicsObj.weeklyObj.rejectedRequests,
              ],
              backgroundColor: ['#0070C4', '#DFB50B', '#FF0000'],
              hoverOffset: 4,
            },
          ],
        },
        dataStatus: [
          {
            name: 'customer.accepted',
            value: statisicsObj.weeklyObj.acceptedRequests,
            bgColor: 'var(--light-blue-50)',
          },
          {
            name: 'customer.underReview',
            value: statisicsObj.weeklyObj.underReviewRequests,
            bgColor: 'var(--yellow-50)',
          },
          {
            name: 'customer.rejected',
            value: statisicsObj.weeklyObj.rejectedRequests,
            bgColor: 'var(--red-100)',
          },
        ],
        TotalExpensesPaid: statisicsObj.weeklyObj.totalPaid + ' جنيه مصرى',
      },
      {
        header: 'customer.totalMonthlyOrders',
        from: '22/4/2023',
        to: '28/4/2023',
        chardData: {
          datasets: [
            {
              label: 'Monthly',
              data: [
                statisicsObj.monthlyObj.acceptedRequests,
                statisicsObj.monthlyObj.underReviewRequests,
                statisicsObj.monthlyObj.rejectedRequests,
              ],
              backgroundColor: ['#0070C4', '#DFB50B', '#FF0000'],
              hoverOffset: 4,
            },
          ],
        },
        dataStatus: [ 
          {
            name: 'customer.accepted',
            value: statisicsObj.monthlyObj.acceptedRequests,
            bgColor: 'var(--light-blue-50)',
          },
          {
            name: 'customer.underReview',
            value: statisicsObj.monthlyObj.underReviewRequests,
            bgColor: 'var(--yellow-50)',
          },
          {
            name: 'customer.rejected',
            value: statisicsObj.monthlyObj.rejectedRequests,
            bgColor: 'var(--red-100)',
          },
        ],
        TotalExpensesPaid: statisicsObj.monthlyObj.totalPaid + ' جنيه مصرى',
      },
    ];
    return chartCardsArr;
  }

  getDashboardData() {
    const url = this.baseUrl + 'basic-data/customer/dashboard';
    return this.http.get(url);
  }
}
