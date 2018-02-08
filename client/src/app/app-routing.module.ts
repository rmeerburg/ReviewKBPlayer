import { Routes } from '@angular/router';
import { RatePlayerComponent } from './players/rate-player/rate-player.component';
import { PlayerComponent } from './players/player/player.component';
import { PlayerListComponent } from 'app/players/player-list/player-list.component';
import { IsAuthenticatedGuard } from 'app/infrastructure/is-authenticated.guard';
import { LoginComponent } from 'app/auth/login.component';

export const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, },
    { path: 'browse/:what', component: PlayerListComponent, canActivate: [IsAuthenticatedGuard], data: { animation: 'browse', } },
    { path: 'players/:id', component: PlayerComponent, canActivate: [IsAuthenticatedGuard], data: { animation: 'player', } },
    { path: 'players/:id/review', component: RatePlayerComponent, canActivate: [IsAuthenticatedGuard], data: { animation: 'review', } },
    { path: '', redirectTo: '/browse/players', pathMatch: 'full' }
    // { path: '**', component: PageNotFoundComponent }
];