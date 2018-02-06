import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RatingService, Review, Rating, Category, Level } from 'app/services/rating.service';
import { PlayersService, Player } from 'app/services/players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './rate-player.component.html',
  styleUrls: ['./rate-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RatePlayerComponent implements OnInit {
  public review: Review;
  public levels: Level[];
  public notes_expanded: boolean = false;
  public currentPanel = 0;
  public player: Player;

  constructor(private readonly ratingService: RatingService, private readonly playersService: PlayersService, private readonly router: Router, private readonly route: ActivatedRoute, private readonly snackBar: MatSnackBar) {
  }

  public async ngOnInit() {
    this.levels = await this.ratingService.getLevels();
    this.review = await this.ratingService.createNewReview();

    this.route.params.subscribe(params => {
      this.playersService.getPlayer(params['id']).subscribe(player => {
        this.player = player;
        this.review.participationId = player.participations[0].participationId;
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

  public getLabelForCategory(cat: Category) {
    return this.ratingService.categories.get(cat);
  }

  public async submitReview() {
    await this.ratingService.saveReview(this.review);
    this.router.navigate(['/players', this.player.registrationId]);
  }

  public showInfoFor(lvl: Level) {
    this.snackBar.open(`${lvl.description}: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`, "sluiten", { duration: 5000, });
  }
}