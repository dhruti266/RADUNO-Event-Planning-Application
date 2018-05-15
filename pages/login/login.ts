import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController, MenuController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';

import { ForgotPasswordPage } from "../forgot-password/forgot-password";
import { RegisterPage } from "../register/register";
import {TabsPage} from "../tabs/tabs";
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  private loginGroup : FormGroup;

  password: AbstractControl;
  email: AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              public alertCtrl: AlertController, private afAuth: AngularFireAuth, private toast: ToastController,
              public menu: MenuController) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.navCtrl.setRoot(TabsPage);
      }
    });
    this.loginGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.email = this.loginGroup.controls['email'];
    this.password = this.loginGroup.controls['password'];
    this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  forgot(){
    this.navCtrl.push(ForgotPasswordPage, null);
  }

  register(){
    this.navCtrl.push(RegisterPage, null);
  }

  showAlert() {
    let alertEmpty = this.alertCtrl.create({
      title: 'Required!',
      subTitle: 'email and password should not be empty',
      buttons: ['OK']
    });

    alertEmpty.present();

  }

  async login(user: User) {
    if (this.loginGroup.valid) {
      try {
        const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        console.log(result);
        if (result) {
          this.navCtrl.setRoot(TabsPage);
        }
      } catch (e) {
        this.toast.create({
          message: `Could not find the user.`,
          duration: 3000,
        }).present();
      }
    }
    else{
      this.showAlert();
    }
  }
}
