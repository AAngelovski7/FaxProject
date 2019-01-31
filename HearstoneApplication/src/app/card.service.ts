import { Injectable } from '@angular/core';

import {of as ObservableOf,Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {CardDeck,Card} from './card-deck/card.model';


@Injectable({
  providedIn: 'root'
})
export class CardService {

    // private readonly cardDecks: string[]=['Druid','Mage','Warrior','Rogue','Shaman','Priest','Warlock','Hunter','Paladin'];

    private readonly HS_API_URL='https://omgvamp-hearthstone-v1.p.mashape.com';
    private readonly API_KEY='abtzY1CEVamshZxcAOnQ6k2Wcarvp1YJQN2jsng2Fg8XDcxKLb';
    private headers: HttpHeaders;



    constructor(private http:HttpClient) {
        this.headers=new HttpHeaders({'X-Mashape-Key':this.API_KEY});
    }


    public getAllCardDecks(): Observable<CardDeck[]>{
        //return ObservableOf(this.cardDecks);
        return this.http.get<CardDeck[]>(`${this.HS_API_URL}/info`,{headers:this.headers});
    }
        // get  cards from the heaerstone api
    public getCardsByDeck(cardDeckGroud:string,cardDeck:string): Observable<Card[]>{
        return this.http.get<Card[]>(`${this.HS_API_URL}/cards/${cardDeckGroud}/${cardDeck}`,{headers:this.headers});
    }


    public getCardById(cardId:string):Observable<Card[]>{
        return this.http.get<Card[]>(`${this.HS_API_URL}/cards/${cardId}`,{headers:this.headers});
    }

    // function for replacing /n with " " empty space
    public replaceCardTextLine(text:string){
        return text ? text.replace(new RegExp("\\\\n",'g')," "): "No description for this card";
    }


}
