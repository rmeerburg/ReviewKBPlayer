import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { isNumber } from "util";

@Injectable()
export class RatingService {
    private scoringMapping = {
        "F": 0,
        "E": 2,
        "D": 4,
        "C": 6,
        "B": 8,
        "A": 10,
    };

    constructor(private readonly http: HttpClient) {
    }

    public async getReviewCategories() {
        return this.http.get<ReviewCategory[]>(`${environment.apiUrl}/reviewcategories`).toPromise();
    }

    public async createNewReview() {
        let review = new Review();
        const categories = await this.getReviewCategories();
        review.ratings = categories.map(cat => {
            var newRating = new Rating();
            newRating.categoryId = cat.id;
            return newRating;
        });
        return review;
    }

    public async saveReview(review: Review) {
        return this.http.post(`${environment.apiUrl}/participations/${review.participationId}/reviews`, review).toPromise();
    }
}

export class Review {
    participationId: string;
    ratedAt: Date;
    ratings: Rating[] = [];
    notes: string;
}

export class Rating {
    levelId: string;
    categoryId: string;
}

export class Level {
    levelId: string;
    reviewCategoryId: string;
    description: string;
    shortDescription: string;
    score: number;
}

export class ReviewCategory {
    id: string;
    categoryName: string;
    levels: Level[];
}