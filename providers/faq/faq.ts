import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class FaqProvider {
  apiUrl = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/b79b93f5-7047-4fc0-b411-a05c2633293f/generateAnswer';

  constructor(public http: HttpClient) {
    console.log('Hello FaqProvider Provider');
  }

  getAnswer(query: string) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl, {'question':query},
        {headers:
            {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key': '9214c20a8cf74f1a9fad924fff2c246c'
            }
        }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
