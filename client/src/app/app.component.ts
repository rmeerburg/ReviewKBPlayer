import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group
} from '@angular/animations';

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
export class AppComponent {

  // change the animation state
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation
  }

}
