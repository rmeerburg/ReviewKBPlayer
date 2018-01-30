import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Review } from "app/services/rating.service";

@Injectable()
export class PlayersService {
    constructor(private readonly http: HttpClient) { }

    public async getPlayer(playerId: string) {
        var rawResults = await this.http.get('https://randomuser.me/api/?results=1').toPromise();
        return this.mapToPlayer((<any>rawResults).results[0]);
    }

    public async getPlayers() {
        var rawResults = await this.http.get('https://randomuser.me/api/?results=100').toPromise();
        return (<any>rawResults).results.sort((l, r) => { return l.name.first < r.name.first ? -1 : 1; }).map(this.mapToPlayer);
    }

    private mapToPlayer(rndUser: any) {
        var randomTeamIds = [1, 2, 3];
        var randomTeamCategories = ['A', 'B', 'C', 'D', 'E', 'F'];

        var newPlayer = new Player();
        newPlayer.firstName = rndUser.name.first;
        newPlayer.lastName = rndUser.name.last;
        newPlayer.thumbnail = rndUser.picture.thumbnail;
        newPlayer.photo = rndUser.picture.large;
        newPlayer.email = rndUser.email;
        newPlayer.dob = rndUser.dob;
        newPlayer.team = `${randomTeamCategories[Math.floor(Math.random() * Math.floor(randomTeamCategories.length))]}${randomTeamIds[Math.floor(Math.random() * Math.floor(randomTeamIds.length))]}`;
        return newPlayer;
    }
}

export class Player {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    dob: Date;
    team: string;
    thumbnail: string;
    photo: string;
    reviews: Review[];
}