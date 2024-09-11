import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityTypeResponse } from '@shared/model/activity-type';
import { ApiResponse } from '@shared/model/api-response.model';
import { CompanyTypeResponse } from '@shared/model/company-type';
import { GovResponse } from '@shared/model/gov-response';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  convertDate(date) {
    const initDate = new Date(date);

    // Extract the various components of the date
    const year = initDate.getFullYear();
    const month = (initDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const day = initDate.getDate().toString().padStart(2, '0');

    // Create a formatted date string in "YYYY-MM-DD" format
    return `${year}-${month}-${day}`;
  }

  convertDateWithTime(date) {
    const initDate = new Date(date);

    // Extract the various components of the date
    const year = initDate.getFullYear();
    const month = (initDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const day = initDate.getDate().toString().padStart(2, '0');
    const hours = initDate.getHours().toString().padStart(2, '0');
    const minutes = initDate.getMinutes().toString().padStart(2, '0');
    const seconds = initDate.getSeconds().toString().padStart(2, '0');

    // Create a formatted date string in "YYYY-MM-DD HH:mm:ss" format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
