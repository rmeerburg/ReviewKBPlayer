import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RatingService, Review, Rating, Category, Level } from 'app/services/rating.service';
import { PlayersService, Player } from 'app/services/players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';

@Component({
  templateUrl: './rate-player.component.html',
  styleUrls: ['./rate-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RatePlayerComponent implements OnInit {
  public review: Review;
  public levels: Level[];

  public currentPanel = 0;

  constructor(private readonly ratingService: RatingService, private readonly playersService: PlayersService, private readonly router: Router, public readonly route: ActivatedRoute) {
  }

  public player: Player;

  public async ngOnInit() {
    this.levels = await this.ratingService.getLevels();
    this.review = await this.ratingService.createNewReview();

    this.route.params.subscribe(params => {
      this.playersService.getPlayer(params['id']).subscribe(player => {
        this.player = player;
        this.review.playerId = player.playerId;
      });
    });
  }

  public getLevelsForRating(rating: Rating) {
    return this.levels.filter(l => l.category == rating.category);
  }

  public rate(lvl: Level) {
    let applicableRating = this.review.ratings.find(r => r.category == lvl.category);
    applicableRating.level = lvl;
    this.currentPanel++;
  }

  public canSubmit() {
    return this.review && !this.review.ratings.some(rating => rating.level === undefined);
  }

  public async submitReview() {
    await this.ratingService.saveReview(this.review);
    this.router.navigate(['/players', this.player.registrationId]);
  }
}