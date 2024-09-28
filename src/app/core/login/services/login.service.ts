import { TranslationService } from 'app/language/translation.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '@login/model/login-response.model';
import { AuthService } from 'app/core/services/auth.service';
import { environment } from 'environments/environment';
import { ApiResponse } from '@shared/model/api-response.model';
import { RequestSubmittedService } from '@operations/services/request-submitted.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl = environment.loginUrl;
  userData = '/assets/usersData.json';
  baseUrl = environment.apiUrl;
  user;

  constructor(
    private auth: AuthService,
    private router: Router,
    private httpClient: HttpClient,
    private translationService: TranslationService,
    private request: RequestSubmittedService
  ) {}

  login(username: string, password: string) {
    let body = { email: username, password: password };
    this.httpClient.post(this.loginUrl, body).subscribe(
      (response: any) => {
        if (response.roles.length === 0) {
          this.router.navigate(['/operations']);
        }

        let roles = response.roles.code;
        let companyStatus = response.company_status;

        // If SuperAdmin, set companyStatus fields to true
        if (roles === 'SuperAdmin') {
          companyStatus.if_company = true;
          companyStatus.is_active = true;
          companyStatus.is_trending = true;
        }

        // Store values in local storage
        localStorage.setItem('activate', companyStatus.is_active);
        localStorage.setItem('ifCompany', companyStatus.if_company);
        localStorage.setItem('companyName', response.company_name);
        localStorage.setItem('userRole', roles); // Store role in local storage

        let permissions = response.roles.permissions.map(
          (permission: any) => permission
        );

        this.auth.updateLoggedInState(
          true,
          response.name,
          companyStatus,
          response.id,
          permissions,
          response.token,
          roles,
          response.registerType
        );

        // Handle routing based on roles
        switch (roles) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'customer':
            if (companyStatus.if_company) {
              if (companyStatus.is_active) {
                this.router.navigate(['/operations']);
              } else {
                this.router.navigate(['/main/login/validateCompany']);
              }
            } else {
              this.router.navigateByUrl('/main/login/registerCompany');
            }
            break;
          case 'department_supervisor':
          case 'manager':
          case 'investors':
          case 'environmental.found':
          case 'employee':
          case 'rdf':
          case 'SuperAdmin': // Added this to route to operations
            this.router.navigate(['/operations/departments']);
            break;
        }
      },
      (error) => {
        this.translationService.toastrTranslation(
          'error',
          'toastr.notValidUsernameOrPassword'
        );
      }
    );
  }

  logout() {
    this.auth.updateLoggedInState(false, null, null, null);
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('companyStatus');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('permissions');
    localStorage.removeItem('registerType');
    localStorage.removeItem('userRole');
    this.router.navigate(['/main/login']);
  }

  forgetPassword(data: any) {
    return this.httpClient.post<ApiResponse>(this.baseUrl + 'changePassword', data);
  }
}
