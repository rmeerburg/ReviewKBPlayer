import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private readonly http: HttpClient) {
  }

  public getUser(email: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${email}`).map(user => Object.assign(new User(), user));
  }

  public getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).map(users => users.map(user => Object.assign(new User(), user)));
  }

  public getUserRoles() {
    return this.http.get<string[]>(`${environment.apiUrl}/roles`);
  }

  public saveUser(user: User) {
    return this.http.request(user.isNew ? 'post' : 'put', `${environment.apiUrl}/users/${user.email}`, { body: user }).map(user => Object.assign(new User(), user)).subscribe();
  }
}

export class User {
  constructor() {
    this.roles = [];
  }
  canChange: boolean = true;
  isNew: boolean;
  isActive: boolean = true;
  name: string;
  email: string;
  roles: string[];
}
