import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {HttpClientModule} from '@angular/common/http';

import {FormsModule} from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import {AndroidFingerprintAuth} from '@ionic-native/android-fingerprint-auth/ngx';
// import { SearchComponent } from './search/search.component';
// import { CardListComponent } from './card-list/card-list.component';
import {FavoriteCardStore} from './card-favorite.store';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(),FormsModule,HttpClientModule],
  providers: [
    StatusBar,
      FavoriteCardStore,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      AndroidFingerprintAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
