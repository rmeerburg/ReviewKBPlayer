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

    public readonly categories: ReadonlyArray<string> = ['Aanvallen', 'Technisch', 'Fysiek', 'Verdedigen', 'Mentaal', 'Tactisch'];

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
        return this.http.post(`${environment.apiUrl}/players/${review.playerId}/reviews`, review).toPromise();
    }
}

export class Review {
    ratedAt: Date;
    playerId: string;
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

// export class Category {
//     constructor(private readonly shift: number, public readonly name: string) {}

//     get weightedScore() {
//         return this.score + this.shift;
//     }

//     public get score() {
//         return this.selectedRating && this.selectedRating.score;
//     }

//     public selectedRating: Rating;
//     public ratings = ['Uitmuntend', 'Goed', 'Gemiddeld', 'Ondermaats', 'Slecht'].map((descr, index) => new Rating(descr, (-index + 5)));
// }

// export class Rating {
//     constructor(public readonly description: string, public readonly score: number) {}
// }