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
        this.categories.set(Category.Attack, "Aanvallen");
        this.categories.set(Category.Defense, "Verdedigen");
        this.categories.set(Category.Fysical, "Fysiek");
        this.categories.set(Category.Mental, "Mentaal");
        this.categories.set(Category.Tactical, "Tactisch");
        this.categories.set(Category.Technical, "Technisch");
    }

    public readonly categories: Map<Category, string> = new Map<Category, string>();

    public async getLevels() {
        return this.http.get<Level[]>(`${environment.apiUrl}/levels`).toPromise();
    }

    public async createNewReview() {
        let review = new Review();
        for (let item in Category) {
            if (!isNaN(Number.parseInt(item)) && Number(item)) {
                let newRating = new Rating();
                newRating.category = <Category>Number(item);
                review.ratings.push(newRating);
            }
        }
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
    level: Level;
    category: Category;
}

export class Level {
    description: string;
    shortDescription: string;
    score: number;
    category: Category;
}

export enum Category {
    Unknown,
    Attack,
    Defense,
    Tactical,
    Technical,
    Fysical,
    Mental,
}