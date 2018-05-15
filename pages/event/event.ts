import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GreetingPage} from "../greeting/greeting";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import moment from "moment";

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  contactList = [];
  eventDetails = [];

  private EventFormGroup : FormGroup;

  title: any;
  date: any;
  location: any;
  budget?: any;
  currDate: any = new Date();

  hostID: any;
  key: string | null;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
      public alertCtrl: AlertController, private afAuth: AngularFireAuth,  private afDatabase: AngularFireDatabase) {

      this.EventFormGroup = this.formBuilder.group({
      title: ['', Validators.compose([ Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z a-zA-Z]*')])],
      date: ['', Validators.compose([ Validators.required])],
      location: ['', Validators.compose([ Validators.required, Validators.maxLength(30)])],
      budget: [" "]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

  gotoGreetingPage(){

    let newEventDate = new Date(this.date);

    if(!this.EventFormGroup.valid || this.contactList.length == 0){
      this.showAlert();
    }
    else {
      if(this.budget == undefined)
      {
        this.budget = "";
      }

      let flag = false;
      let pastDate = false;
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDatabase.list(`event/${auth.uid}`).valueChanges()
          .subscribe(eventDates=>{
            for(var i=0; i < eventDates.length; i++){

              let oldEventDate = new Date(eventDates[i]['date']);

              // checks whether an event is created for given event date
              if(oldEventDate.toLocaleDateString() == newEventDate.toLocaleDateString()){
                let alert = this.alertCtrl.create({
                  title: 'Error!',
                  subTitle: 'You can not host more than one event on the same date',
                  buttons: ['OK']
                });
                alert.present();
                flag = true;
                break;
              }
            }

            // checks for the past date and cuurent date
            console.log(newEventDate.toLocaleDateString());
            console.log(newEventDate.toLocaleDateString() <= new Date(this.currDate).toLocaleDateString());


            if(newEventDate.toLocaleDateString() <= new Date(this.currDate).toLocaleDateString()){
              let alert = this.alertCtrl.create({
                title: 'Error!',
                subTitle: 'You can not host an event in the past or today',
                buttons: ['OK']
              });
              alert.present();
              pastDate = true;
            }
            // inserts new event to the database
            if(!flag && !pastDate){
              this.hostID = auth.uid;
              this.date = moment(this.date).format('lll');

              this.eventDetails.push({"hostID":this.hostID, "title": this.title, "date": this.date, "location": this.location,
                "budget": this.budget, "invitees": this.contactList});
              this.navCtrl.push(GreetingPage, { event_details: this.eventDetails });
            }
          });

      });
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Make sure missing information is filled and invites are added',
      buttons: ['OK']
    });
    alert.present();
  }

  //imports contacts from user phone
  getContacts(){
    let self = this;
    if(self.contactList.length < 10) {
      navigator.contacts.pickContact(function (contact) {
        console.log("Sdfasd" + contact.phoneNumbers[0]['value'].replace(/[- )(]/g,''));
        var obj = {"name": contact.displayName, "phone": contact.phoneNumbers[0]['value'].replace(/[- )(]/g,''), "accepted": "pending"};
        if(self.checkDuplicateContacts(obj, self.contactList)){
          let alert = self.alertCtrl.create({
            title: 'Warning!',
            subTitle: 'You can not add duplicates invitees ',
            buttons: ['OK']
          });
          alert.present();
        }else{
          self.contactList.push({"name": contact.displayName, "phone": contact.phoneNumbers[0]['value'].replace(/[- )(]/g,''), "accepted": "pending"});
        }
      }, function (err) {
        console.log('Error: ' + err);
      });
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Warning!',
        subTitle: 'You can not add more than 10 invites for standard account ',
        buttons: ['OK']
      });
      alert.present();
    }

  }

  removeContact(contact){
    let index = this.contactList.indexOf(contact);

    if(index > -1){
      this.contactList.splice(index, 1);
    }
  }

  checkDuplicateContacts(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
        return true;
      }
    }
    return false;
  }

}
