import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RatingService, Review, Rating, Category } from 'app/services/rating.service';

@Component({
  templateUrl: './rate-player.component.html',
  styleUrls: ['./rate-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RatePlayerComponent implements OnInit {
  public review: Review;
  public currentCat: Category;

  constructor(private readonly ratingService: RatingService) {
  }

  public player: any = {
    name: 'Antjan',
  };

  public ngOnInit() {
    this.review = this.ratingService.createEmptyRating('D');
    this.currentCat = this.review.categories[0];
  }

  public rate(cat: Category, rating: Rating) {
    cat.selectedRating = rating;
    const currentCatIndex = this.review.categories.lastIndexOf(cat);
    if(currentCatIndex < this.review.categories.length - 1) {
      this.currentCat = this.review.categories[currentCatIndex + 1];
    } else {
      this.currentCat = null;
    }
  }

  public setCurrentCat(cat: Category) {
    this.currentCat = cat;
  }

  public canSubmit() {
    return !this.review.categories.some(cat => cat.selectedRating === undefined);
  }
}