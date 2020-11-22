import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {APP_REDUCERS} from './store/app.reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from 'src/environments/environment';
import {AuthModule} from './modulos/auth/auth.module';
import {AuthService} from './modulos/auth/servicios/auth.service';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MapaService} from './modulos/mapa/servicios/mapa.service';


@NgModule({
    declarations: [
        AppComponent,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        StoreModule.forRoot(
            APP_REDUCERS,
        ),
        EffectsModule
            .forRoot(
                [],
            ),
        StoreDevtoolsModule
            .instrument(
                {
                    maxAge: 25,
                    logOnly: environment.production,
                },
            ),
        AuthModule,
        BrowserAnimationsModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        MapaService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private readonly authService: AuthService,
        ) {
    }
}
