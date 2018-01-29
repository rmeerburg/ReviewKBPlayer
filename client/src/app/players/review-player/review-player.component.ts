import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './review-player.component.html',
  styleUrls: ['./review-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewPlayerComponent implements OnInit {

  public player: any = {
    name: 'Antjan',
    team: 'F2',
  };

  constructor() { }

  ngOnInit() {
  }
}