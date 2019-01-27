import { Injectable } from '@angular/core';

import {of as ObservableOf,Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {CardDeck} from './card-deck/card.model';


@Injectable({
  providedIn: 'root'
})
export class CardService {

    private readonly cardDecks: string[]=['Druid','Mage','Warrior','Rogue','Shaman','Priest','Warlock','Hunter','Paladin'];

    private readonly HS_API_URL='https://omgvamp-hearthstone-v1.p.mashape.com';
    private readonly API_KEY='abtzY1CEVamshZxcAOnQ6k2Wcarvp1YJQN2jsng2Fg8XDcxKLb';




    constructor(private http:HttpClient) {

    }


    public getAllCardDecks(): Observable<CardDeck[]>{
        const headers=new HttpHeaders({'X-Mashape-Key':this.API_KEY});
        //return ObservableOf(this.cardDecks);
        return this.http.get<CardDeck[]>(`${this.HS_API_URL}/info`,{headers});

    }

}
