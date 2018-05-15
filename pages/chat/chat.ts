import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import firebase from "firebase";
import {NotificationsProvider} from "../../providers/notifications/notifications";
import {FirebaseListObservable} from "angularfire2/database-deprecated";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  listedEvents: any = [];
  message: string;
  selectedEventKey: string;
  currUser: any;
  profile: any;
  messages: any = [];
  currEventTitle: string;
  uids: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private notificationsProvider: NotificationsProvider,
              private afAuth: AngularFireAuth,  private afDatabase: AngularFireDatabase) {
    this.getHostedEventsForChat();
  }

  getHostedEventsForChat(){
    this.afDatabase.list('/event/').valueChanges()
      .subscribe(eventSnapshots=>{
        this.listedEvents = [];
        eventSnapshots.map(event=>{
          if(event["hostID"] == this.currUser.uid){
            this.listedEvents.push(event);
          }
          var invitees = event["invitees"];
          invitees.forEach(invitee=>{
            if(invitee.uid == this.currUser.uid && invitee.accepted == "accepted"){
              this.listedEvents.push(event);
            }
          });
        });
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.afDatabase.list(`profile/${auth.uid}`).valueChanges().subscribe(profile => {
        this.profile = profile[0];
      });
    });
  }

  selectEventForChat(){
    this.currEventTitle = "";
    this.uids = [];
    this.afDatabase.list('event/'+this.selectedEventKey+"/chat").valueChanges()
      .subscribe(data=>{
        this.messages = data;
      });

    let invitees: FirebaseListObservable<any>;
    this.afDatabase.object("event/" + this.selectedEventKey).valueChanges()
      .subscribe(eventSnapshot => {
        this.currEventTitle = eventSnapshot["title"];
        this.uids = [];
        this.uids.push(eventSnapshot["hostID"]);
        invitees = eventSnapshot["invitees"];
        invitees.forEach(invitee => {
          console.log(invitee);
          if (invitee["uid"] != this.currUser.uid && invitee["accepted"]=="accepted") {
            this.uids.push(invitee["uid"]);
          }
        });
        console.log(this.uids);
        }
      );
  }

  sendMessage(){
    this.afDatabase.list("event/" + this.selectedEventKey + "/chat/").push({
      'name': this.profile["name"],
      'message': this.message,
      'uid': this.currUser.uid
    });
    this.message = '';
    this.notify();
  }

  notify() {
    console.log("notify");
    this.uids.forEach(item=>{
      console.log(item);
      console.log("New Message from " + this.profile["name"] + " in Event: " + this.currEventTitle);
      this.notificationsProvider.notify("New Message from " + this.profile["name"] + " in Event: " + this.currEventTitle,
        item);
    });
  }
}
