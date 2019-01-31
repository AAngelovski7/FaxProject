import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {Storage} from '@ionic/storage';
import {Platform,NavController} from '@ionic/angular';


const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'card-deck', loadChildren: './card-deck/card-deck.module#CardDeckPageModule' },
  { path: 'card-listing', loadChildren: './card-listing/card-listing.module#CardListingPageModule' },
  { path: 'card-detail', loadChildren: './card-detail/card-detail.module#CardDetailPageModule' },
  { path: 'card-favorite', loadChildren: './card-favorite/card-favorite.module#CardFavoritePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private navCtrl: NavController, private platform: Platform, private storage: Storage){

      this.platform.ready().then(() => {
          this.storage.get('HearstoneApp.opened_slides').then((data) => {

              if(data){
                  this.navCtrl.navigateRoot('/login');
              }
              else{
                  this.navCtrl.navigateRoot('/intro');
              }

          })
      })
  }




}
