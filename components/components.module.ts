import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent } from './header/header';

@NgModule({
	imports: [
    IonicModule.forRoot(HeaderComponent),
  ],
	exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class ComponentsModule {}
