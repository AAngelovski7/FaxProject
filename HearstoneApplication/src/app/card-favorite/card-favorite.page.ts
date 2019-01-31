import { Component, OnInit } from '@angular/core';
import {FavoriteCardStore} from '../card-favorite.store';
import {Subscription} from 'rxjs';
import {Card} from '../card-deck/card.model';

import {CardService} from '../card.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-card-favorite',
  templateUrl: './card-favorite.page.html',
  styleUrls: ['./card-favorite.page.scss'],
})
export class CardFavoritePage implements OnInit {

  favoriteCardSub:Subscription;
    favoriteCardList:Card[]=[];
card:Card;
  constructor(private favoriteCardStore:FavoriteCardStore,private cardService:CardService,private route:ActivatedRoute) {

    this.favoriteCardSub = this.favoriteCardStore.favoriteCards.subscribe((favoriteCards:any)=>{
        // assign favorite cards to favoriteCardList
        //favoriteCardList return an array of favorite cards wiht all atributes that the card have
          this.favoriteCardList=this.getFavoriteCardList(favoriteCards);
      })
  }

  ngOnInit() {  }

    ionViewDidLeave(){
        if(this.favoriteCardSub && !this.favoriteCardSub.closed){
            this.favoriteCardSub.unsubscribe();
        }
    }
  //transform favorite card objecct into favoriteCard array because we return object
  //Object.keys will return an array of object keys for ex: ['card1','card2','card3'] and than itterating this array
    private getFavoriteCardList(favoriteCards:any):Card[]{
        if(favoriteCards){
            return Object.keys(favoriteCards).filter(key=>favoriteCards[key]).map(key=>favoriteCards[key])
        }
        return[];
    }



    updateImages(){
        this.card.img = '/assets/image/DefaultCard.png'
    }

}
