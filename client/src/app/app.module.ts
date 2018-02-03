import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatToolbarModule, MatTabsModule, MatListModule, MatExpansionModule, MatInputModule, MatIconModule, MatIconRegistry, } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { ChartsModule } from 'ng2-charts';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { AppComponent } from './app.component';
import { RatePlayerComponent } from './players/rate-player/rate-player.component';
import { appRoutes } from './app-routing.module';
import { PlayerComponent } from './players/player/player.component';
import { RatingService } from './services/rating.service';
import { PlayersService } from './services/players.service';
import { PlayerListComponent } from './players/player-list/player-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RatePlayerComponent,
    PlayerComponent,
    PlayerListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MomentModule,
    LoadingBarHttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [RatingService, PlayersService, MatIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
 }
