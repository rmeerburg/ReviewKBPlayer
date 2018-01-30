import { Routes } from '@angular/router';
import { RatePlayerComponent } from './players/rate-player/rate-player.component';
import { PlayerComponent } from './players/player/player.component';

export const appRoutes: Routes = [
    { path: 'players', component: RatePlayerComponent, },
    { path: 'players/:id', component: PlayerComponent, },
    { path: 'players/:id/review', component: RatePlayerComponent },
    { path: '', redirectTo: '/heroes', pathMatch: 'full' }
    // { path: '**', component: PageNotFoundComponent }
];