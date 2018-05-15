import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';

import { ComponentsModule } from '../components/components.module';
import {TabsPage} from "../pages/tabs/tabs";
import {ChatPage} from "../pages/chat/chat";
import {ShopPage} from "../pages/shop/shop";
import {BudgetPage} from "../pages/budget/budget";
import {CalendarPage} from "../pages/calendar/calendar";
import {ProfilePage} from "../pages/profile/profile";
import {SettingsPage} from "../pages/settings/settings";
import {FeedbackPage} from "../pages/feedback/feedback";
import {FAQsPage} from "../pages/fa-qs/fa-qs";
import {EventPage} from "../pages/event/event";
import {GreetingPage} from "../pages/greeting/greeting";

import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONFIG} from "./app.firebase.config";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import { HttpClientModule } from '@angular/common/http';
import { ShopProvider } from '../providers/shop/shop';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {Ionic2RatingModule} from "ionic2-rating";
import { FaqProvider } from '../providers/faq/faq';
import {Camera} from "@ionic-native/camera";
import {Contact} from "@ionic-native/contacts";
import {Cordova} from "@ionic-native/core";
import {ViewEventPage} from "../pages/view-event/view-event";
import { HostEventProvider } from '../providers/host-event/host-event';
import {AddExpensePage} from "../pages/add-expense/add-expense";
import {File} from "@ionic-native/file";
import {DefaultGreetingPage} from "../pages/default-greeting/default-greeting";
import { NotificationsProvider } from '../providers/notifications/notifications';
import {EventSummaryPage} from "../pages/event-summary/event-summary";
import { CalendarModule } from 'ionic3-calendar-en';
import {Calendar} from "@ionic-native/calendar";
import {SMS} from "@ionic-native/sms";
import {AboutusPage} from "../pages/aboutus/aboutus";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    TabsPage,
    EventPage,
    GreetingPage,
    ChatPage,
    ShopPage,
    BudgetPage,
    CalendarPage,
    ProfilePage,
    SettingsPage,
    FeedbackPage,
    FAQsPage,
    EditProfilePage,
    ViewEventPage,
    AddExpensePage,
    DefaultGreetingPage,
    EventSummaryPage,
    AboutusPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    Ionic2RatingModule,
    CalendarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    TabsPage,
    EventPage,
    GreetingPage,
    ChatPage,
    ShopPage,
    BudgetPage,
    CalendarPage,
    ProfilePage,
    SettingsPage,
    FeedbackPage,
    FAQsPage,
    EditProfilePage,
    ViewEventPage,
    AddExpensePage,
    DefaultGreetingPage,
    EventSummaryPage,
    AboutusPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    ShopProvider,
    InAppBrowser,
    Ionic2RatingModule,
    FaqProvider,
    Camera,
    Contact,
    HostEventProvider,
    File,
    NotificationsProvider,
    Calendar,
    SMS
    // {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
