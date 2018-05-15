import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GreetingPage } from './greeting';

@NgModule({
  declarations: [
    GreetingPage,
  ],
  imports: [
    IonicPageModule.forChild(GreetingPage),
  ],
})
export class GreetingPageModule {}
