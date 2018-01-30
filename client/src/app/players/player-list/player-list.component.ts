import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player, PlayersService } from 'app/services/players.service';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  public filterTerm: string = '';
  public players: Player[] = [];
  private allPlayers: Player[] = [];

  public teams: any;

  constructor(private readonly playerService: PlayersService) { }

  public async ngOnInit() {
    this.allPlayers = this.players = await this.playerService.getPlayers();

    this.teams = this.allPlayers.reduce((prev, current, index, result) => {
      var teamForPlayer = prev.find(t => t.id === current.team);
      if(teamForPlayer) {
        teamForPlayer.players.push(current);
      } else {
        var newTeam = new Team();
        newTeam.id = current.team;
        newTeam.players = [current];
        prev.push(newTeam);
      }
      return prev;
    }, <Team[]>[]).sort((l, r) => l.id > r.id ? 1 : -1);
  }

  public filter() {
    if(!this.filterTerm) {
      this.players = this.allPlayers;
    }
    this.players = this.allPlayers.filter(p => p.fullName.toLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1);
  }
}

class Team {
  id: string;
  players: Player[];
}