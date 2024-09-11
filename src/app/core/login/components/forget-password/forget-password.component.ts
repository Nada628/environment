import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoginService } from '@login/services/login.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

login=inject(LoginService)
  password: string | Blob;
  confirmPassword: string | Blob;

  send(){
    let data= new FormData()
    data.append('password', this.password)
    data.append('confirm_password', this.confirmPassword)
    this.login.forgetPassword(data)
  }
}
