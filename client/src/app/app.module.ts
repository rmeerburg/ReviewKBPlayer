import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatTabsModule, MatListModule, MatExpansionModule, MatInputModule, } from '@angular/material';

import { AppComponent } from './app.component';
import { RatePlayerComponent } from './players/rate-player/rate-player.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app-routing.module';
import { PlayerComponent } from './players/player/player.component';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';
import { RatingService } from './services/rating.service';
import { PlayersService } from './services/players.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RatePlayerComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [RatingService, PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
