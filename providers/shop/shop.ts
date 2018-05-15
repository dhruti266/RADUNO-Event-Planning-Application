import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the ShopProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShopProvider {

  apiUrl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAA8_mBvDL8C3GKohquxqXLAF5iGI2NrOE&cx=010289565427330242273:r1dyrhsdhok&q=';

  constructor(public http: HttpClient) {
    console.log('Hello ShopProvider Provider');
  }

  getProducts(query: string) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+query).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
