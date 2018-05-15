import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
/**
 * Generated class for the DefaultGreetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-default-greeting',
  templateUrl: 'default-greeting.html',
})
export class DefaultGreetingPage {

  callback;
  imageList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
              public viewCtrl: ViewController) {
    this.callback = this.navParams.get("callback");
  }

  ionViewDidLoad() {
    this.imageList = [
      { title: 'Birthday', url: 'assets/cards/card1.jpg' },
      { title: 'Birthday', url: 'assets/cards/card2.jpg' }
    ]
  }

  getSelectedCard(image: any){

    this.navCtrl.pop().then(() => {
      // Trigger custom event and pass data to be send back
      this.events.publish('imageUrl', image);
    });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
