import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  rate: string;
  comment: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  onModelChange(newObj){
    console.log('rat FeedbackPage' + this.rate);
  }

  submitFeedback(){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.list(`rating/${auth.uid}/`)
        .push({"stars": this.rate, "comment": this.comment})
        .then(() => this.navCtrl.push(TabsPage));
    });
  }


}
