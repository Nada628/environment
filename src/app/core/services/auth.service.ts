import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppUser } from '../models/app-user';
import { parseJson } from '@angular/cli/src/utilities/json-file';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject(false);
  public isLoggedInSubject$ = this.isLoggedInSubject.asObservable();
  public loginSignal = signal<boolean>(false);
  public userRole: string;
  public user: string;
  public userId: string;
  public registerType: string;
  public appUser: AppUser;
  public updateUser = new BehaviorSubject(null);

  companyStatus;

  getUserRole(): string {
    const role = localStorage.getItem('userRole');
    console.log('User Role:', role);  // Debugging line
    return role;
  }
  

  public permissions: any[];
  constructor(private jwtHelper: JwtHelperService) {
    this.updateLoggedInState(
      this.hasToken(),
      this.getName(),
      this.getCompanyStatus(),
      this.getId(),
      this.getPermissions(),
      this.getToken(),
      this.getRoles(),
      '6'
    );
  }

  updateLoggedInState(
    status: boolean,
    userName: string,
    companyStatus,
    id,
    permissions?,
    token?,
    roles?,
    registerType?
  ) {
    if (status && roles && userName) {
      this.user = userName;
      this.userId = id;
      this.appUser = token;
      this.permissions = permissions;
      this.companyStatus = companyStatus

      this.updateUser.next(this.user);
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userId', id);
      localStorage.setItem('permissions', JSON.stringify(permissions));
      localStorage.setItem('roles', roles);
      localStorage.setItem('companyStatus', JSON.stringify(companyStatus));
      localStorage.setItem('registerType', registerType);
      this.userRole = roles;

      // this.registerType = registerType;
    }
    this.isLoggedInSubject.next(status);
    this.loginSignal.set(status);
  }

  extractDataFromToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    decodedToken.sub = parseJson(decodedToken.sub);
    return decodedToken;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private getName(): string {
    return localStorage.getItem('userName');
  }

  private getPermissions(): string {
    return JSON.parse(localStorage.getItem('permissions'));
  }

  private getId(): string {
    return localStorage.getItem('userId');
  }

  private getCompanyStatus(): string {
    return JSON.parse(localStorage.getItem('companyStatus'));
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }

  private getRoles(): string {
    return localStorage.getItem('roles');
  }
}
