import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RatingService } from 'app/services/rating.service';
import { PlayersService, Player } from 'app/services/players.service';
import { SimpleDialogComponent } from '../../common/dialogs/simple/simple-dialog.component';
import { SimpleDialogService } from '../../services/simple-dialog.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public player: Player;
  public storageUrl: string = environment.storageUrl;

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

  public radarChartData: any = [
    { data: [3, 3, 2, 5, 2, 3,], label: '2016' },
    { data: [4, 2, 4, 5, 3, 3,], label: '2017' }
  ];
  public radarChartType: string = 'radar';

  constructor(private readonly http: HttpClient, private readonly ratingService: RatingService, private readonly playerService: PlayersService, private readonly route: ActivatedRoute, private readonly dialogService: SimpleDialogService, private readonly router: Router) { }

  public async ngOnInit() {
    this.radarChartData = [
      { data: Array.from(Array(6).keys()).map(_ => Math.floor(Math.random() * Math.floor(5)) + 1), label: '2016', },
      { data: Array.from(Array(6).keys()).map(_ => Math.floor(Math.random() * Math.floor(5)) + 1), label: '2017', },
    ];
    this.route.params.subscribe(p => {
      this.playerService.getPlayer(p['id']).subscribe(async player => {
        this.player = player;
        this.player.participations.reverse();
        const categories = await this.ratingService.getReviewCategories(this.player);
        categories.forEach(cat => this.radarChartLabels.push(cat.categoryName));
      }, (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.dialogService.show({ title: 'Speler niet gevonden', message: `Speler met registratie '${p['id']}' bestaat niet` }).subscribe(result => {
            this.router.navigate(['/browse/players']);
          });
        }
      });
    });
  }

  public setFallbackImage(event: any) {
    event.target.src = `/assets/player-photos/fallback/unknown_avatar_${this.player.gender}.png`;
  }
}
