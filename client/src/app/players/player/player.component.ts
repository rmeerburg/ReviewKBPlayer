import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  public hasReviews() {
    return this.player && this.player.participations && this.player.participations.some(p => !!p.reviews.length);
  }

  public readonly radarChartLabels: string[] = [];
 
  public radarChartData:any = [
    {data: [3, 3, 2, 5, 2, 3,], label: '2016'},
    {data: [4, 2, 4, 5, 3, 3,], label: '2017'}
  ];
  public radarChartType:string = 'radar';

  constructor(private readonly http: HttpClient, private readonly ratingService: RatingService, private readonly playerService: PlayersService, private readonly route: ActivatedRoute) { }

  public async ngOnInit() {
    this.radarChartData = [
      { data: Array.from(Array(6).keys()).map(_ => Math.floor(Math.random() * Math.floor(5)) + 1), label: '2016', },
      { data: Array.from(Array(6).keys()).map(_ => Math.floor(Math.random() * Math.floor(5)) + 1), label: '2017', },
    ];
    this.route.params.subscribe(p => {
      this.playerService.getPlayer(p['id']).subscribe(player => {
        this.player = player;
        this.player.participations.reverse();
      });
    });
    const categories = await this.ratingService.getReviewCategories();
    categories.forEach(cat => this.radarChartLabels.push(cat.categoryName));
  }
}
