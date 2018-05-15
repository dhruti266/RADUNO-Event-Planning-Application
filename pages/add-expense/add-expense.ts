import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the AddExpensePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-expense',
  templateUrl: 'add-expense.html',
})
export class AddExpensePage {

  event: any;
  expenseDetail: any = {
    "amount": "",
    "description": "",
    "date" : ""
  };

  remainingBudget: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
              public alertCtrl: AlertController) {
   this.event = navParams.get('event');
   this.remainingBudget = navParams.get('remainingBudget');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExpensePage');
  }

  addExpense(){
    var sum = 0;
    if(parseInt(this.remainingBudget) - parseInt(this.expenseDetail.amount) >= 0){
      this.afDatabase.list(`event/` + this.event["key"] + "/expense/")
        .push(this.expenseDetail)
        .then(() => this.closeModal());
    }else{
      console.log("helloo" + this.remainingBudget);
      let alertEmpty = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: 'Your cannot add expense more than your remaining budget which is ' + this.remainingBudget,
        buttons: ['OK']
      });
      alertEmpty.present();
    }
  }

  closeModal(){
    // this.navCtrl.setRoot(TabsPage, {selectedEvent: this.event});
    this.viewCtrl.dismiss({selectedEvent: this.event});
  }

}
