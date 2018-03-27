import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-player-image',
    template: `<img src="/assets/player_photos/large/{{playerId}}.jpg" />`,
    styles: ['img { width: 100% }'],
})
export class PlayerImageComponent implements OnInit {
    public playerId: string;

    constructor(private readonly route: ActivatedRoute) { }

    public async ngOnInit() {
        this.route.params.subscribe(params => {
            this.playerId = params['id'];
        });
    }
}
