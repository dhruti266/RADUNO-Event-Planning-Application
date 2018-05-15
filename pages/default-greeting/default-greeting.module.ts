import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefaultGreetingPage } from './default-greeting';

@NgModule({
  declarations: [
    DefaultGreetingPage,
  ],
  imports: [
    IonicPageModule.forChild(DefaultGreetingPage),
  ],
})
export class DefaultGreetingPageModule {}
