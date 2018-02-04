import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Review } from "app/services/rating.service";
import { environment } from "environments/environment";

@Injectable()
export class PlayersService {
    constructor(private readonly http: HttpClient) { }

    public getPlayer(playerId: string) {
        return this.http.get<Player>(`${environment.apiUrl}/players/${playerId}`);
    }

    public getPlayers() {
        return this.http.get<Player[]>(`${environment.apiUrl}/players`);
    }

}

export class Player {
    playerId: string;
    email: string;
    name: string;
    dob: Date;
    registrationId: string;

    participations: Participation[];
    reviews: Review[];
}

export class Participation {
    participationId: string;
    teamId: string;
    team: Team;
    playerId: string
    reviews: Review[];
}

export class Team {
    name: string;
}