import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class NotificationsProvider {
  apiUrl = 'https://onesignal.com/api/v1/notifications';

  constructor(public http: HttpClient, public afAuth: AngularFireAuth, private afDatabase :AngularFireDatabase) {
    console.log('Hello NotificationsProvider Provider');
  }

  notify(msg, uid){
    return new Promise(resolve => {
      this.http.post(this.apiUrl, {
          "app_id": "69996f67-593b-4a96-b44f-b15c68d0ee53",
          "filters": [
            {"field": "tag", "key": "uid", "relation": "=", "value": uid}
          ],
          "data": {"foo": "bar"},
          "contents": {"en": msg}
        },
        {headers:
            {
              'Content-Type': 'application/json',
              'Authorization': 'Basic MGIzYTY5NTUtZDFiYS00ZjEwLWE1N2MtYjhjMGRjMTE4MzYz'
            }
        }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
