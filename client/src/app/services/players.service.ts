import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PlayersService {
    constructor(private readonly http: HttpClient) { }

    public async getPlayer(playerId: string) {
        var result = new Player();
        result.id = playerId;
        result.firstName = 'Antjan';
        result.team = 'D2';
        return result;
    }

    public async getPlayers() {
        var randomTeamIds = [1, 2, 3];
        var randomTeamCategories = ['A', 'B', 'C', 'D', 'E', 'F'];

        var rawResults = await this.http.get('https://randomuser.me/api/?results=100').toPromise();

        return (<any>rawResults).results.sort((l, r) => { return l.name.first < r.name.first ? -1 : 1; }).map(rndUser => {
            var newPlayer = new Player();
            newPlayer.firstName = rndUser.name.first;
            newPlayer.lastName = rndUser.name.last;
            newPlayer.thumbnail = rndUser.picture.thumbnail;
            newPlayer.team = `${randomTeamCategories[Math.floor(Math.random() * Math.floor(randomTeamCategories.length))]}${randomTeamIds[Math.floor(Math.random() * Math.floor(randomTeamIds.length))]}`;
            return newPlayer;
        });
    }
}

export class Player {
    id: string;
    firstName: string;
    lastName: string;
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    dob: Date;
    team: string;
    thumbnail: string;
}