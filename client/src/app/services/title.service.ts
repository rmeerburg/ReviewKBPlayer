import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable()
export class TitleService {
    private _title: string;
    public get title() {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
        document.title = title;
        if (!environment.production) {
            document.title = `${document.title} [development build]`;
        }
    }

    public useDefaultTitle() {
        this.title = 'CKV Oranje Wit - TalentTrack';
    }
}