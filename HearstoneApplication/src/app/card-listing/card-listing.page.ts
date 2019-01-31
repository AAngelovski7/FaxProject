import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {CardService} from '../card.service';
import {Card} from '../card-deck/card.model';
import { LoadingController } from '@ionic/angular';
import {ToastService} from '../toast.service';
import {Storage} from '@ionic/storage';
import {FavoriteCardStore} from '../card-favorite.store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage implements OnInit {

    cardDeckGroup:string;
    cardDeck:string;
    cards:Card[]=[];
    loader:any;
    copyOfCards:Card[]=[]; // for search component
    isLoading:boolean=false; //for spiner
    favoriteCards:any={};
    favoriteCardSub:Subscription;


  constructor(private route:ActivatedRoute,
              private cardService:CardService,
              private loadingController: LoadingController,
              private toastService:ToastService,
              private storage:Storage,
              private favoriteCardStore:FavoriteCardStore) {

    // subscribe to service for favorite cards to favorite card subject because that emit cards and asign to before declared arrat favoritecards[]
      //favoritecards to which we subscribe come from favorite card service and return observables of emitet favorite cars
      this.favoriteCardSub = this.favoriteCardStore.favoriteCards.subscribe((favoriteCards:any)=>{
          this.favoriteCards=favoriteCards;
      })


      //get favorite card from storage but in first time we do not have is null andd assign on favorite card empty object
      this.storage.get('favoriteCards').then((favoriteCards)=>{
                 this.favoriteCards=favoriteCards || {};
           });


  }


    // uns subscribe fronm favorite card
    // i bez ova ke rabotit kartive pak ke si stojat favoorite
    // if favorite card Sub exist
    ionViewDidLeave(){
        if(this.favoriteCardSub && !this.favoriteCardSub.closed){
            this.favoriteCardSub.unsubscribe();
        }
    }




  ngOnInit() {}




    private async presentLoading(){
        const loader = await this.loadingController.create({
            message: 'Loading',
            translucent: true
        });
        loader.present();
        return loader;
    }
    private async getCard(){
        this.loader=await this.presentLoading();
        // caling function for data to be loaded when loader edning with loading
        //  this is a line for featching the data and without this line no data will be shown in for ex Warrior
        // if(this.cards && this.cards.length===0) this.getCard();
        // want from url to get cardDeckgroup
        this.cardService.getCardsByDeck(this.cardDeckGroup,this.cardDeck).subscribe((cards:Card[])=>{
            this.cards=cards.map((card:Card)=>{
                card.text=this.cardService.replaceCardTextLine(card.text);
                card.favorite=this.isCardFavorite(card.cardId);
                return card;
            });
            //create copy of cards array that we have created
            this.copyOfCards=Array.from(this.cards);
            this.loader.dismiss();
        },()=>{
            this.loader.dismiss();
            this.toastService.presentErrorToast("Cards could not be loaded let's try to refresh page")})
  }

     // to check if the card is favorite to be colorized red and if not to be colorized white
    private isCardFavorite(cardId:string):boolean{
        const card=this.favoriteCards[cardId];
        return card ? true:false; // if get card from favorite card by id return true insted false
    }



    ionViewWillEnter()
{
    this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this.route.snapshot.paramMap.get('cardDeck');
    if(this.cards && this.cards.length===0) this.getCard(); // make no loading to be shown when data is shown because function for get cards was called when we back and we get data but loading is loading
}

    doRefresh(event){
      this.getCard();
      event.target.complete();
    }


    // cards array is equal to cards that we get to this function
    hydrateCards(cards:Card[]){
         this.cards=cards;
         this.isLoading=false;
    }
  //for spiner to be shown when we type in search bar
    handleSearch(){
        this.isLoading=true;
    }
        //if the card is facorite on click make not favorite
    //when click on card we assignt this card to facoriteCards initialized before and check if card is favorite or no
    //and then assign card into storage under key of cardID and store this card with key of cardId INTO THE STORAGE

    favoriteCard(card:Card) {
      this.favoriteCardStore.toggleCard(card);
    }


}
