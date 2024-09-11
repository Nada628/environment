import { Component } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public authSerivce: AuthService) {}
}
