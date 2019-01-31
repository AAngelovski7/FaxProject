import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {CardService} from '../card.service';
import {Card} from '../card-deck/card.model';
import {LoadingController} from '@ionic/angular';
import {AlertService} from '../alert.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {

card:Card;
loader:any;

    constructor(private route: ActivatedRoute,
                private cardService: CardService,
                private loadingController: LoadingController,
                private alertService:AlertService){}


    ngOnInit(){}

    // function for presenting the loader from Ionic documentation
    private async presentLoading(){
        const loader = await this.loadingController.create({
            message: 'Loading',
            translucent: true
        });
        loader.present();
        return loader;
    }

   async ionViewWillEnter() {
      const cardId = this.route.snapshot.paramMap.get('cardId');  // get cardId from route
        this.loader=await this.presentLoading();
            this.cardService.getCardById(cardId).subscribe((card:Card[])=>{
                this.card=card.map((card:Card)=>{
                    card.text=this.cardService.replaceCardTextLine(card.text); // replaceCardTextLine replace /n with space this is function from cardService
                    return card; //vrakat card array of one card [id,type,text,img,faction....]
                })[0];
                this.loader.dismiss();
            })

}

    updateImage(){
      this.card.imgGold = '/assets/image/DefaultCard.png'
    }

}
