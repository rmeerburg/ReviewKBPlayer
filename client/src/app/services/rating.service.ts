import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { isNumber } from "util";
import { Player, PlayersService } from "./players.service";

@Injectable()
export class RatingService {
    private static readonly teamScores = ['F', 'E', 'D', 'C', 'B', 'A'].map((value, index) => ({ teamKind: value, score: 4 + (index * 3) }));

    constructor(private readonly http: HttpClient) {
    }

    public async getReviewCategories(player: Player) {
        const categories = await this.http.get<ReviewCategory[]>(`${environment.apiUrl}/reviewcategories`).toPromise();

        for (let cat of categories) {
            cat.levels = cat.levels.filter(level => level.teamCategory === this.getPlayerTeamCategory(player));
        }
        return categories;
    }

    public async createNewReview() {
        let review = new Review();
        const categories = await this.getAllCategoriesAndLevels();
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

    private async getAllCategoriesAndLevels() {
        return this.http.get<ReviewCategory[]>(`${environment.apiUrl}/reviewcategories`).toPromise();
    }

    private getPlayerTeamCategory(player: Player) {
        const latestParticipation = player.participations.slice(-1)[0];
        if (!latestParticipation)
            return undefined;

        return latestParticipation.team.name[0];
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
    teamCategory: string;
}

export class ReviewCategory {
    id: string;
    categoryName: string;
    levels: Level[];
}