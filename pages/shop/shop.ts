import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ShopProvider} from "../../providers/shop/shop";
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  products = [];
  url: string;
  query: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public shotProvider: ShopProvider, private inAppBrowser: InAppBrowser) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  search(){
    this.getProducts();
  }

  getProducts() {
    this.shotProvider.getProducts(this.query)
      .then(data => {
        console.log(data);
        this.products.pop();
        this.products.push(data["items"]);
        console.log(this.products);
        console.log(this.products[0].title);
      });
  }

  openWebpage(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }

    // Opening a URL and returning an InAppBrowserObject
    this.inAppBrowser.create(url, '_self', options);
  }

}
