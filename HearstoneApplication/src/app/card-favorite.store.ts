import { Injectable } from '@angular/core';
import {BehaviorSubject,Observable} from 'rxjs';
import {Storage} from '@ionic/storage';
import {Card} from './card-deck/card.model';
@Injectable()
export class FavoriteCardStore  {
    private favoriteCardSubject = new BehaviorSubject({});


    constructor(private storage:Storage){
        this.loadInitialData();
    }


    get favoriteCards():Observable<any>{
        return this.favoriteCardSubject.asObservable();
    }

    private loadInitialData(){
            // get from storage favorite cards that we set first
            this.storage.get('favoriteCards').then((favoriteCards)=>{
            // then emit the favorites cards or empty object
            this.favoriteCardSubject.next(favoriteCards || {});
            // in a is all favourite cards that are emitet
            const a=this.favoriteCardSubject.getValue(); // need to subscribe to this data on page where we want card to be shown
        })
    }


    //if the card is facorite on click make not favorite
    //when click on card we assignt this card to facoriteCards initialized before and check if card is favorite or no
    //and then assign card into storage under key of cardID and store this card with key of cardId INTO THE STORAGE
    public toggleCard(card:Card ){
        const favoriteCards = this.favoriteCardSubject.getValue(); // return favorutes card
        if(card.favorite){
            card.favorite=false;
            delete favoriteCards[card.cardId];}
        else {
            card.favorite=true;
            favoriteCards[card.cardId]=card;}
        this.storage.set('favoriteCards',favoriteCards).then(()=>{
            this.favoriteCardSubject.next(favoriteCards);
        });
    }
}