import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player, PlayersService, Team, PlayerListModel } from 'app/services/players.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  public filterTerm: string = '';
  public players: PlayerListModel[] = [];
  private allPlayers: PlayerListModel[] = [];
  public teams: TeamVm[];
  public currentTabIndex: number = 0;

  constructor(private readonly playerService: PlayersService, private readonly route: ActivatedRoute, private readonly router: Router) {
  }

  public async ngOnInit() {
    this.route.params.subscribe(params => {
      const what = <string>params['what'];
      if(what === 'players') {
        this.currentTabIndex = 0;
      } else {
        this.currentTabIndex = 1;
      }
    });
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

  public tabChanged() {
    this.router.navigate(['browse', this.currentTabIndex === 0 ? 'teams' : 'players'], { replaceUrl: true, });
  }

  private setPlayers(players: PlayerListModel[]) {
    this.allPlayers = this.players = players.sort((l, r) => { return l.name < r.name ? -1 : 1; });
    const noTeam = new TeamVm();
    noTeam.name = 'Geen Team';

    this.teams = this.allPlayers.reduce((prev, current, index, result) => {
      if(!current.currentTeam) {
        noTeam.players.push(current);
        return prev;
      } 
      var teamForPlayer = prev.find(t => t.name === current.currentTeam);
      if(teamForPlayer) {
        teamForPlayer.players.push(current);
      } else {
        var newTeam = new TeamVm();
        newTeam.name = current.currentTeam;
        newTeam.players = [current];
        prev.push(newTeam);
      }
      return prev;
    }, [noTeam]).sort((l, r) => l.name > r.name ? 1 : -1);
  }
}

class TeamVm extends Team {
  players: PlayerListModel[] = [];
}