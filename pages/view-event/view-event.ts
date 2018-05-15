import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the ViewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-event',
  templateUrl: 'view-event.html',
})
export class ViewEventPage {

  currEvent: any = [];
  hostUser: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDatabase :AngularFireDatabase) {
    this.currEvent = JSON.parse(navParams.get("viewEvent"));

    this.afDatabase.list('/profile/' + this.currEvent["hostID"]).valueChanges()
      .subscribe(values=>{
        this.hostUser = values[0];
       });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEventPage');
  }

}
