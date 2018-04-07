import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'app/infrastructure/authentication.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly auth: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const requiredRoles = route.data["roles"] as Array<string>;
    return requiredRoles === null || !!this.auth.user.roles.find(r => requiredRoles.indexOf(r) != -1);
  }
}