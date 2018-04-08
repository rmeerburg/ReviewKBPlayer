import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TeamsService {

  constructor(private readonly http: HttpClient) {
  }

  public getTeams() {
    return this.http.get<Team[]>(`${environment.apiUrl}/teams`);
  }
}

export class Team {
}
