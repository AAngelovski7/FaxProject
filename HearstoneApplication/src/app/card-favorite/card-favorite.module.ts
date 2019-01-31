import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CardFavoritePage } from './card-favorite.page';
import {FavoriteCardStore} from '../card-favorite.store';

const routes: Routes = [
  {
    path: '',
    component: CardFavoritePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CardFavoritePage],
    providers: [ FavoriteCardStore]
})
export class CardFavoritePageModule {}
