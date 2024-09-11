import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@login/services/login.service';

@Component({
  selector: 'app-login-section',
  templateUrl: './login-section.component.html',
  styleUrl: './login-section.component.scss',
})
export class LoginSectionComponent implements OnInit {
  loginForm?: any;
  router=inject(Router)
  constructor(private fb: FormBuilder, private loginService: LoginService) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      this.loginService.login(email, password);
    }
  }

  forgotPassword() {
    this.router.navigateByUrl('/forgetPassword')
  }
}
