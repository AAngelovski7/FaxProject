import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CardListingPage } from './card-listing.page';
import {SearchComponent} from '../search/search.component';
// import {FavoriteCardStore} from '../card-favorite.store';

const routes: Routes = [
  {
    path: '',
    component: CardListingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CardListingPage,SearchComponent]
    // providers:[
    //   FavoriteCardStore
    // ]
})
export class CardListingPageModule {}
