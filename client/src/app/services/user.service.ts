import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private readonly http: HttpClient) {
  }

  public getUser(email: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${email}`);
  }

  public getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  public getUserRoles() {
    return this.http.get<string[]>(`${environment.apiUrl}/roles`);
  }

  public saveUser(user: User) {
    return this.http.request(user.isNew ? 'post' : 'put', `${environment.apiUrl}/users/${user.email}`, { body: user }).subscribe();
  }
}

export class User {
  constructor() {
    this.isNew = true;
  }

  canChange: boolean = true;
  isNew: boolean;
  name: string;
  email: string;
  roles: string[];
}
