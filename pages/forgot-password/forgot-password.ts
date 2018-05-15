import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import { LoginPage } from "../login/login";
import {AngularFireAuth} from "angularfire2/auth";
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  private forgotGroup : FormGroup;

  // password: AbstractControl;
  // confirmPass: AbstractControl;
  email: AbstractControl;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              private afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    this.forgotGroup = this.formBuilder.group({
      email: ['', Validators.compose([ Validators.required, Validators.email, Validators.maxLength(35)])]
      // password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      // confirmPass: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
    });

    this.email = this.forgotGroup.controls['email'];
    // this.password = this.forgotGroup.controls['password'];
    // this.confirmPass = this.forgotGroup.controls['confirmPass'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  showLogin(){
    this.navCtrl.push(LoginPage);
  }

  changePassword(){
    if(this.forgotGroup.valid) {
      this.afAuth.auth.sendPasswordResetEmail(this.forgotGroup.get('email').value);
      this.showSuccessAlert();
      this.navCtrl.push(LoginPage);
    }
    else {
      this.showAlert();
    }
  }

  showAlert() {
    let alertEmpty = this.alertCtrl.create({
      title: 'Required!',
      subTitle: 'Please enter a valid email address',
      buttons: ['OK']
    });

    alertEmpty.present();

  }

  showSuccessAlert() {
    let alertEmpty = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Password reset link has been sent to your email address.',
      buttons: ['OK']
    });

    alertEmpty.present();

  }

}
