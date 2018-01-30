import { Injectable } from "@angular/core";

@Injectable()
export class PlayersService {
    public async getPlayer(playerId: string) {
        var result = new Player();
        result.id = playerId;
        result.name = 'Antjan';
        result.team = 'D2';
        return result;
    }

    public async getPlayers() {
        return [await this.getPlayer('1')];
    }
}

export class Player {
    id: string;
    name: string;
    team: string;
}