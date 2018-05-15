import { Component, ViewChild } from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//runs by default login page
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from "../pages/profile/profile";
import {SettingsPage} from "../pages/settings/settings";
import {FeedbackPage} from "../pages/feedback/feedback";
import {FAQsPage} from "../pages/fa-qs/fa-qs";
import {AngularFireAuth} from "angularfire2/auth";
import { TabsPage } from "../pages/tabs/tabs";
import moment from 'moment';
import {HomePage} from "../pages/home/home";
import firebase from "firebase";
import {AngularFireDatabase} from "angularfire2/database";
import {AboutusPage} from "../pages/aboutus/aboutus";

export interface PageInterface {
  title: string;
  pageName: string;
  component: any;
  index: number;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  pages: PageInterface[] = [
    { title: 'Profile', pageName: 'TabsPage', component: ProfilePage, index: 0, icon: 'person' },
    { title: 'Settings', pageName: 'TabsPage', component: SettingsPage, index: 1, icon: "settings" },
    { title: 'Feedback', pageName: 'TabsPage', component: FeedbackPage, index: 2, icon: "star" },
    { title: 'FAQs', pageName: 'TabsPage', component: FAQsPage, index: 3, icon: "help" },
    { title: 'About Us', pageName: 'TabsPage', component: AboutusPage, index: 4, icon: "contacts" }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public afAuth: AngularFireAuth, private afDatabase :AngularFireDatabase) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      moment.locale('en');
      splashScreen.hide();



      // var notificationOpenedCallback = function(jsonData) {
      //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      // };
      //
      // window["plugins"].OneSignal
      //   .startInit("69996f67-593b-4a96-b44f-b15c68d0ee53", "258729076239")
      //   .handleNotificationOpened(notificationOpenedCallback)
      //   .endInit();

      // window["plugins"].OneSignal.sendTag("key", "value");
    });

  }

  logout(){
    this.afAuth.auth.signOut().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }
  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario// The active child nav is our Tabs Navigation
      this.nav.getActiveChildNav().select(page.index);

  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();

    // matches the active tab item with menu item and if it matches, returns the color
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.component) {
        return 'primary';
      }
      return;
    }
    return;
  }
}

