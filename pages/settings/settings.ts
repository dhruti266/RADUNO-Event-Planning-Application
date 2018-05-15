import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {TabsPage} from "../tabs/tabs";
import firebase from "firebase";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  notifications: any;
  language: any;
  location: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth => {
      this.afDatabase.list(`settings/${auth.uid}/notification`).valueChanges().subscribe(settings => {
        this.notifications = settings[0]["notification"];
        console.log("setting data: ");
        console.log(settings[0]["notification"]);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  updateItem(){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.list(`settings/${auth.uid}/notification`).remove();
      this.afDatabase.list(`settings/${auth.uid}/notification`)
        .push({"notification": this.notifications})
        .then(() => this.navCtrl.push(TabsPage));
    });
  }

}
