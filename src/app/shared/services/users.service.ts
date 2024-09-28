import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  tableHeader;

  constructor(private http: HttpClient) {
    this.tableHeader = {
      name: 'test',
      headers: [
        'tableHeader.serialNumber',
        'tableHeader.name',
        'tableHeader.email',
        'tableHeader.username',
        'tableHeader.departmentName',
        'tableHeader.settings',
      ],
    };
  }
//   fetch roles
getRoles(): Observable<any> {
  const url = `${environment.apiUrl}roles/index`;
  return this.http.get(url);
}

// Fetch departments for regestier type
getDepartments(): Observable<any> {
  const url = `${environment.apiUrl}departments`;
  return this.http.get(url);
}
  // Fetch all users
  getUsers(): Observable<any> {
    const url = `${environment.apiUrl}user/index`;
    return this.http.get(url);
  }
  // Fetch users data by ID
  getUserById(id: number): Observable<any> {
    const url = `${environment.apiUrl}user/${id}`;
    return this.http.get<any>(url);
  }
  // Submit users data to the API
  addUser(usertData: any): Observable<any> {
    const url = `${environment.apiUrl}add/user`;
    return this.http.post(url, usertData);
  }
  // Update user data 
  updateUsers(id: number, usertData: any): Observable<any> {
    const url = `${environment.apiUrl}user/update/${id}`;
    return this.http.post(url, usertData);
  }
  
  // Delete user by ID
  deleteUser(id: number): Observable<any> {
    const url = `${environment.apiUrl}user/${id}`; 
    return this.http.delete(url);
  }
}
