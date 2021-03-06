import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group
} from '@angular/animations';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from './infrastructure/authentication.service';
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition('* => *', [
        query(':enter',
          [
            style({ opacity: 0 })
          ],
          { optional: true }
        ),
        group([
          query(':leave',
            [
              style({ opacity: 1 }),
              animate('0.5s', style({ opacity: 0 }))
            ],
            { optional: true }
          ),
          query(':enter',
            [
              style({ opacity: 0 }),
              animate('0.5s', style({ opacity: 1 }))
            ],
            { optional: true }
          )])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  public canNavigateToParent: boolean = false;

  constructor(private readonly router: Router, public readonly auth: AuthenticationService, public readonly titleService: TitleService, private readonly route: ActivatedRoute) {
  }

  // change the animation state
  public getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }

  public ngOnInit() {
    this.titleService.useDefaultTitle();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const navigationEndEvent = <NavigationEnd>event;
        this.canNavigateToParent = !/^(\/|\/browse\/(?:players|teams))$/.test(navigationEndEvent.url);
      }
    });
  }

  public navClicked() {
    window.history.back();
  }

  public signOut() {
    this.auth.signOut();
  }
}
