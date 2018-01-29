import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatTabsModule, MatListModule, } from '@angular/material';

import { AppComponent } from './app.component';
import { ReviewPlayerComponent } from './players/review-player/review-player.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app-routing.module';
import { PlayerComponent } from './players/player/player.component';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ReviewPlayerComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
