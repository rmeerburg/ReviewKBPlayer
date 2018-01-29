import { Routes } from '@angular/router';
import { ReviewPlayerComponent } from './players/review-player/review-player.component';
import { PlayerComponent } from './players/player/player.component';

export const appRoutes: Routes = [
    { path: 'players', component: ReviewPlayerComponent, },
    { path: 'players/:id', component: PlayerComponent, },
    { path: 'players/:id/review', component: ReviewPlayerComponent },
    { path: '', redirectTo: '/heroes', pathMatch: 'full' }
    // { path: '**', component: PageNotFoundComponent }
];