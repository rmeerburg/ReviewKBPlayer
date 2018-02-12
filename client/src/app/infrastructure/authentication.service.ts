import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private readonly _tokenKey: string = 'auth_token';

  constructor(private readonly route: Router) {
  }
  
  public get token(): string {
    return localStorage.getItem(this._tokenKey);
  }

  public set token(token: string) {
    localStorage.setItem(this._tokenKey, token);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public signOut() {
    localStorage.removeItem(this._tokenKey);
    this.route.navigate(['/login']);
  }
}