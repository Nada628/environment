import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangingPasswordService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  changingPassword(body: { password: string; confirm_password: string }) {
    return this.http.post(`${this.apiUrl}changePassword `, body);
  }
}
