import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireAuth} from "angularfire2/auth";
import { LoginPage } from "../login/login";
import {TabsPage} from "../tabs/tabs";
import {User} from "../../models/user";
import {Profile} from "../../models/profile";
import {AngularFireDatabase} from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  profile = {} as Profile;

  private registerFormGroup : FormGroup;

  fname: any;
  username: any;
  email: any;
  password: any;
  phone: any;
  dob: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              public alertCtrl: AlertController, private afAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase) {
    this.registerFormGroup = this.formBuilder.group({
      fname: ['', Validators.compose([ Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z a-zA-Z]*')])],
      username: ['', Validators.compose([ Validators.required, Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9]*')])],
      email: ['', Validators.compose([ Validators.required, Validators.email, Validators.maxLength(35)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('([2-9]\\d{2})(\\D*)([2-9]\\d{2})(\\D*)(\\d{4})')])],
      dob: ['', Validators.required],
    });

  }

  async register(user: User, profile: Profile) {

    if(!this.registerFormGroup.valid){
      this.showAlert();
    }
    else {
      console.log("success!")
      try {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

        console.log(result);

        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDatabase.list(`profile/${auth.uid}`).push(profile)
            .then(() => this.navCtrl.push(TabsPage));
        });
      }
      catch (e){
        console.error(e);
      }
    }
  }

  showLogin(){
    this.navCtrl.push(LoginPage);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Make sure missing information is filled. ',
      buttons: ['OK']
    });
    alert.present();
  }
}
