import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CardDeckPage } from './card-deck.page';

import {CardService} from '../card.service';
import {HttpClientModule} from '@angular/common/http';
import {CardListComponent} from '../card-list/card-list.component';

const routes: Routes = [
  {
    path: '',
    component: CardDeckPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      HttpClientModule
  ],
  providers: [
    CardService
  ],
  declarations: [CardDeckPage,CardListComponent]
})
export class CardDeckPageModule {}
