import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FaqProvider} from "../../providers/faq/faq";

@IonicPage()
@Component({
  selector: 'page-fa-qs',
  templateUrl: 'fa-qs.html',
})

export class FAQsPage {

  faqChat: any = [];
  queryForm: any;
  answer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public faqProvider: FaqProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaQsPage');
  }

  getAnswer() {
    this.faqProvider.getAnswer(this.queryForm).then(data => {
      this.answer = data["answers"][0]["answer"];
      this.faqChat.push({"question": this.queryForm, "answer": this.answer});
    }).then(
    ()=>{
      this.queryForm = "";
    }
    );
  }

}
