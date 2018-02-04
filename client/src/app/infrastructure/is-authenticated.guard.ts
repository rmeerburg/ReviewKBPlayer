import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from 'app/infrastructure/authentication.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly auth: AuthenticationService) {}

  canActivate() {
    if(!this.auth.isAuthenticated()) {
       this.auth.logout();
       return false;
    }
    return true;
  }
}