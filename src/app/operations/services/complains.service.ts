import { AuthService } from 'app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ComplainsService {
  baseUrl: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.baseUrl = environment.apiUrl;
  }

  getRequests() {
    const url = this.baseUrl + 'complain/requests';
    return this.http.get(url);
  }

  getComplainsAndReplies() {
    const url = this.baseUrl + 'reply';
    return this.http.get(url);
  }

  sendingComplains(body: { complain: string; request: string }) {
    const url = this.baseUrl + 'complain';
    return this.http.post(url, body);
  }
}
