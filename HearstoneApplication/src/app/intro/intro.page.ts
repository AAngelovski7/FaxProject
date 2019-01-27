import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
    private slides;
  //provide flip effect
    slideOpts = {
        effect: 'flip'
    };
  constructor(private storage:Storage) { }

  ngOnInit() {

      // JS code from ionic Documentation about SLIDES for ex, effect to be flip
      this.slides= document.querySelector('ion-slides');
      this.slides.options = {
          effect: 'flip'
      }

  }

    // function for going from one slide to the next
    goNext(){
        this.slides.slideNext();
    }

    // set the data for variable 'HearstoneApp.opened_slides' to true and that mean that we have data we will use for intro when is opened once to not be opened again
    openedSlides(){
        this.storage.set('HearstoneApp.opened_slides',true);
    }
}
