import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router/';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public credentials: LoginModel = new LoginModel();

  constructor(private readonly http: HttpClient, private readonly route: Router) {
  }

  public submit() {
    this.http.post(`${environment.apiUrl}/auth/login`, this.credentials).subscribe(async response => {
      localStorage.setItem('auth_token', (<any>response).auth_token);
      await this.route.navigate(['/']);
    }, error => {
      debugger;
    });
  }
}

export class LoginModel {
  email: string;
  password: string;
}