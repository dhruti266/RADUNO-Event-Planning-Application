import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetPage } from './budget';

@NgModule({
  declarations: [
    BudgetPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgetPage),
  ],
})
export class BudgetPageModule {}
