import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventSummaryPage } from './event-summary';

@NgModule({
  declarations: [
    EventSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(EventSummaryPage),
  ],
})
export class EventSummaryPageModule {}
