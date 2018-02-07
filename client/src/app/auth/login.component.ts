import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router/';
import { AuthenticationService } from 'app/infrastructure/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public credentials: LoginModel = new LoginModel();

  public loginFailed: boolean;
  public authenticating: boolean;

  constructor(private readonly http: HttpClient, private readonly auth: AuthenticationService, private readonly route: Router) {
  }

  public ngOnInit() {
    if(this.auth.isAuthenticated()) {
      this.route.navigate(['/']);
    }
  }

  public submit() {
    this.authenticating = true;
    this.http.post(`${environment.apiUrl}/auth/login`, this.credentials).subscribe(async response => {
      this.auth.token = (<any>response).auth_token
      await this.route.navigate(['/']);
    }, error => {
      this.authenticating = false;
      this.loginFailed = true;
    });
  }
}

export class LoginModel {
  email: string;
  password: string;
}