import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RatingService } from 'app/services/rating.service';
import { PlayersService, Player } from 'app/services/players.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public player: Player;

  public chartOptions = {
    maintainAspectRatio: false,
    scale: {
      ticks: {
        min: 0,
        max: 5,
        stepSize: 1,
      }
    }
  }

  public radarChartLabels:ReadonlyArray<string>;// = ['Aanvallen', 'Verdedigen', 'Scoren', 'Teamspel', 'Tactiek'];
 
  public radarChartData:any = [
    {data: [3, 3, 2, 5, 2, 3,], label: '2016'},
    {data: [4, 2, 4, 5, 3, 3,], label: '2017'}
  ];
  public radarChartType:string = 'radar';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


  constructor(private readonly http: HttpClient, private readonly ratingService: RatingService, private readonly playerService: PlayersService) { }

  async ngOnInit() {
    this.radarChartData = [
      { data: Array.from(Array(6).keys()).map(_ => Math.floor(Math.random() * Math.floor(5)) + 1), label: '2016', },
      { data: Array.from(Array(6).keys()).map(_ => Math.floor(Math.random() * Math.floor(5)) + 1), label: '2017', },
    ];
    this.player = await this.playerService.getPlayer('foo');
    this.radarChartLabels = this.ratingService.categories;
  }
}
