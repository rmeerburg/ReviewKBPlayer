import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player, PlayersService, Team } from 'app/services/players.service';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  public filterTerm: string = '';
  public players: Player[] = [];
  private allPlayers: Player[] = [];

  public teams: TeamVm[];

  constructor(private readonly playerService: PlayersService) {
   }

  public async ngOnInit() {
    this.playerService.getPlayers().subscribe(data => this.setPlayers(data));
  }

  public filter() {
    if(!this.filterTerm) {
      this.players = this.allPlayers;
    }
    this.players = this.allPlayers.filter(p => p.name.toLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1);
  }

  public clearFilter() {
    this.filterTerm = '';
    this.filter();
  }

  private setPlayers(players: Player[]) {
    this.allPlayers = this.players = players.sort((l, r) => { return l.name < r.name ? -1 : 1; });
    const noTeam = new TeamVm();
    noTeam.name = 'Geen Team';

    this.teams = this.allPlayers.reduce((prev, current, index, result) => {
      if(!current.participations.length) {
        noTeam.players.push(current);
        return prev;
      } 
      var teamForPlayer = prev.find(t => t.name === current.participations[0].team.name);
      if(teamForPlayer) {
        teamForPlayer.players.push(current);
      } else {
        var newTeam = new TeamVm();
        newTeam.name = current.participations[0].team.name;
        newTeam.players = [current];
        prev.push(newTeam);
      }
      return prev;
    }, [noTeam]).sort((l, r) => l.name > r.name ? 1 : -1);
  }
}

class TeamVm extends Team {
  players: Player[] = [];
}