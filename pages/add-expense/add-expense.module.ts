import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddExpensePage } from './add-expense';

@NgModule({
  declarations: [
    AddExpensePage,
  ],
  imports: [
    IonicPageModule.forChild(AddExpensePage),
  ],
})
export class AddExpensePageModule {}
