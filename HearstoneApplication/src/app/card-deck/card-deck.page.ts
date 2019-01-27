import { Component, OnInit } from '@angular/core';

import {CardService} from '../card.service';
import {CardDeck} from './card.model';


@Component({
  selector: 'app-card-deck',
  templateUrl: './card-deck.page.html',
  styleUrls: ['./card-deck.page.scss'],
})
export class CardDeckPage implements OnInit {

  public cardDecks:CardDeck[]=[]; // ova ja povkvime so this.cardDeck i na ova mu prakame data od card service
    private readonly ALLOWED_DECKS = ['classes', 'factions', 'qualities', 'types', 'races'];


    constructor(private cardService:CardService) {
    this.getCardDecks();
  }

  // on cardDecks array that we initialize public we give a data from cardService from array in service cardDecks
  //send data from cardService to cardDeck page in function getCardDecks()

  private getCardDecks(){
    this.cardService.getAllCardDecks().subscribe(
        (cardDecks : CardDeck[])=>{
            this.extractAllowedDecks(cardDecks);})    // will get from hearstone api data like an object CardDecks[] is the interface
  }


  // function to fetch data into the allowed_decks from cardDecks[]
  extractAllowedDecks(cardDecks:CardDeck[]) {   //CardDeck[] interfaceto e
  this.ALLOWED_DECKS.forEach((deckName:string)=>{// we reacive the deck name for ex. classses
     // then pushes name classes into cardDeck  like onject with name and also recive all elements with classes key
    this.cardDecks.push({name: deckName, types: cardDecks[deckName]})          // pushing into the cardDecks array declared empty
      })                                                                          //like a object with name of deckName and types of cardDeck[deckName]
    }
    //where deckName is a key for type and types is an array


    // cardD eckGroup is 'classes,factions...' and cardDeck is 'hunter,mage,warrior'
    generateUrl(cardDeckGroup: string, cardDeck: string): string {  //: string because return url need this
        return `/tabs/card/${cardDeckGroup}/${cardDeck}`;

    }



  ngOnInit() {
  }

}
