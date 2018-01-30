import { Injectable } from "@angular/core";

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

    public readonly categories: ReadonlyArray<string> = ['Aanvallen', 'Technisch', 'Fysiek', 'Verdedigen', 'Mentaal', 'Tactisch'];

    createnewReview(bracket: string) {
        var rating = new Review();
        rating.categories = this.categories.map(cat => new Category(this.scoringMapping[bracket], cat));
        return rating;
    }
}

export class Review {
    date: Date;
    playerId: string;
    submittedBy: string;
    categories: Category[];
    notes: string;
}

export class Category {
    constructor(private readonly shift: number, public readonly name: string) {}

    get weightedScore() {
        return this.score + this.shift;
    }

    public get score() {
        return this.selectedRating && this.selectedRating.score;
    }

    public selectedRating: Rating;
    public ratings = ['Uitmuntend', 'Goed', 'Gemiddeld', 'Ondermaats', 'Slecht'].map((descr, index) => new Rating(descr, (-index + 5)));
}

export class Rating {
    constructor(public readonly description: string, public readonly score: number) {}
}