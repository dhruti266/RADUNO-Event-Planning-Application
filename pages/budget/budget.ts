import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
import { HostEventProvider } from '../../providers/host-event/host-event';
import firebase from "firebase";
import {AddExpensePage} from "../add-expense/add-expense";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the BudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
  providers: [HostEventProvider]
})
export class BudgetPage {
  hostedEvents: any = [];
  selectedEvent: any = [];
  selectedEventKey : any;
  selectedEventExpenses : any = [];
  remainingBudget: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,
              public hostEventsProvider: HostEventProvider, public modalCtrl: ModalController,
              private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
      this.menu.swipeEnable(true);

      if(navParams.get('selectedEvent')){
        this.selectedEvent = navParams.get('selectedEvent');
      }
    }

  ionViewDidLoad() {
    this.hostedEvents = [];
    this.hostedEvents = this.hostEventsProvider.getHostedEventsWithBudget();
    console.log('ionViewDidLoad BudgetPage');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter BudgetPage');
  }

  selectEventForBudget(){
    this.selectedEventExpenses = [];
    if(this.selectedEvent.key==undefined){
      this.hostedEvents.forEach(item=>{
        if(item["key"]==this.selectedEventKey){
          this.selectedEvent = item;
        }
      });
    }else{
      this.selectedEventKey = this.selectedEvent.key;
    }

    var sum = 0;
    this.afDatabase.list('/event/'+this.selectedEventKey+"/expense").valueChanges()
      .subscribe(expenseSnapshots=>{
        this.selectedEventExpenses = [];
        this.ionViewDidLoad();
        expenseSnapshots.map(expense=>{
          this.selectedEventExpenses.push(expense);
          sum += parseFloat(expense["amount"]);
        });
        this.remainingBudget = this.selectedEvent["budget"] - sum;
      });
  }

  presentAddExpenseModal() {
    let modal = this.modalCtrl.create(AddExpensePage, {event: this.selectedEvent, remainingBudget: this.remainingBudget});
    modal.present();
  }

}
