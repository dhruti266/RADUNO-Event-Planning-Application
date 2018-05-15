import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import firebase from "firebase";
@Injectable()
export class HostEventProvider {

  currUser: any;
  profile: any;
  constructor(public http: HttpClient, private afAuth: AngularFireAuth,  private afDatabase: AngularFireDatabase) {
    console.log('Hello HostEventProvider Provider');
  }

  getHostedEventsWithBudget(){
    let hostedEvents: any = [];

    this.afAuth.authState.take(1).subscribe(auth => {
      this.currUser = auth;
      this.afAuth.authState.subscribe(auth => {
        this.afDatabase.list('/event/').valueChanges()
          .subscribe(eventSnapshots=>{
            eventSnapshots.map(event=>{
              if(event["hostID"]==this.currUser.uid && event["budget"] > 0){
                hostedEvents.push(event);
              }
            });
          });
      });
    });
    return hostedEvents;
  }



}
