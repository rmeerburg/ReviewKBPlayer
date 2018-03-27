import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatToolbarModule, MatTabsModule, MatListModule, MatExpansionModule, MatInputModule, MatIconModule, MatIconRegistry, MatStepperModule, MatSnackBarModule, MatMenuModule, } from '@angular/material';
import { MomentModule } from 'angular2-moment';
import { ChartsModule } from 'ng2-charts';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { RatePlayerComponent } from './players/rate-player/rate-player.component';
import { appRoutes } from './app-routing.module';
import { PlayerComponent } from './players/player/player.component';
import { RatingService } from './services/rating.service';
import { PlayersService } from './services/players.service';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { LoaderComponent } from './common/loader/loader.component';
import { IsAuthenticatedGuard } from 'app/infrastructure/is-authenticated.guard';
import { LoginComponent } from 'app/auth/login.component';
import { AuthenticationService } from 'app/infrastructure/authentication.service';
import { TokenInterceptor } from 'app/infrastructure/token.interceptor';
import { CacheInterceptor } from 'app/infrastructure/cache.interceptor';
import { environment } from 'environments/environment';
import { CustomReuseStrategy } from 'app/infrastructure/reuse-strategy';
import { PlayerImageComponent } from 'app/players/player/player-image.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RatePlayerComponent,
    PlayerComponent,
    PlayerImageComponent,
    PlayerListComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production, }),
    MomentModule,
    LoadingBarHttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    MatSnackBarModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    RatingService,
    PlayersService, 
    MatIconRegistry, 
    IsAuthenticatedGuard, 
    AuthenticationService,
    CacheInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: CacheInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
 }
