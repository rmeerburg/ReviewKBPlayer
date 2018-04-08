import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private readonly _tokenKey: string = 'auth_token';
  private _user: { sub: string, roles: string[] };

  constructor(private readonly route: Router) {
    if (this.token) {
      this._user = this.deserializeToken(this.token);
    }
  }

  public get token(): string {
    return localStorage.getItem(this._tokenKey);
  }

  public set token(token: string) {
    localStorage.setItem(this._tokenKey, token);
    this._user = this.deserializeToken(token);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public signOut() {
    localStorage.removeItem(this._tokenKey);
    this.route.navigate(['/login']);
  }

  public get user(): { sub: string, roles: string[] } {
    return this._user;
  }

  private deserializeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const user = JSON.parse(window.atob(base64));

    return (({ sub, roles }) => ({ sub, roles }))(user);
  }
}