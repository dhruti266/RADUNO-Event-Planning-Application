import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "firebase/app";
import {Profile} from "../../models/profile";
import firebase from "firebase";
import {ProfilePage} from "../profile/profile";
import {Camera} from "@ionic-native/camera";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
declare var window: any;

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  newEmail = "";
  newPassword = "";

  profile: any;
  currUser: any;

  editUser = {} as User;
  editProfile = {} as Profile;
  private editProfileFormGroup : FormGroup;

  picData: any;
  picdata: any;
  picurl: any;
  mypicref: any;

  public Fbref:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth:AngularFireAuth, private afDatabase :AngularFireDatabase,
              public camera :Camera, private formBuilder: FormBuilder) {

    this.mypicref = firebase.storage().ref('/');

    this.Fbref = firebase.storage().ref('/');

    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.editUser = this.currUser;
      console.log("Current User: ");
      console.log(this.currUser);
      this.picData = firebase.storage().ref('/').child(this.currUser.uid).getDownloadURL()
        .then(function(url){
          console.log("log1: " + url);
          return url;
        }).catch(res=>{
          console.log("errrrrrrrrrrrrrrrrrrrrrr");
        });
      this.afDatabase.list(`profile/${auth.uid}`).valueChanges().subscribe(profile => {
        this.profile = profile[0];
        this.editProfile = this.profile;
        console.log("Current User Profile: ");
        console.log(this.editProfile);
      });
    });

    this.editProfileFormGroup = this.formBuilder.group({
      name: ['', Validators.compose([ Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z a-zA-Z]*')])],
      username: ['', Validators.compose([ Validators.required, Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9]*')])],
      email: ['', Validators.compose([Validators.email, Validators.maxLength(35)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(15)])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('([2-9]\\d{2})(\\D*)([2-9]\\d{2})(\\D*)(\\d{4})')])],
      dob: ['']
    });
  }

  // update profile data
   updateProfile() {
     console.log("Processed New user email: ");
     console.log(this.newEmail);

     this.afAuth.authState.subscribe(auth => {
       this.afDatabase.list(`profile/${auth.uid}`).remove();
       this.afDatabase.list(`profile/${auth.uid}`).update(auth.uid, this.profile);
       if(this.newEmail.length>0){
         auth.updateEmail(this.newEmail);
       }
       if(this.newPassword.length>5){
         auth.updatePassword(this.newPassword);
       }
       this.navCtrl.setRoot(ProfilePage);
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  ionViewWillEnter(){
    this.afAuth.authState.subscribe(auth => {
      this.currUser = auth;
      this.editUser = this.currUser;
      console.log("Current User: ");
      console.log(this.currUser);
      this.picData = firebase.storage().ref('/').child(this.currUser.uid).getDownloadURL()
        .then(function(url){
          console.log("log1: " + url);
          return url;
        }).catch(res=>{
          console.log("errrrrrrrrrrrrrrrrrrrrrr");
        });
      this.afDatabase.list(`profile/${auth.uid}`).valueChanges().subscribe(profile => {
        this.profile = profile[0];
        this.editProfile = this.profile;
        console.log("Current User Profile: ");
        console.log(this.editProfile);
      });
    });
  }

  getMedia(){
    this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType:this.camera.MediaType.ALLMEDIA,
      destinationType:this.camera.DestinationType.FILE_URI
    }).then(fileuri=>{
      window.resolveLocalFileSystemURL("file://"+fileuri, EF=>{
        EF.file(file=>{
          const FR = new FileReader()
          FR.onloadend=(res:any)=>{
            let AF = res.target.result
            let blob = new Blob([new Uint8Array(AF)],{type:'image/png'})
            this.upload(blob);
          };
          FR.readAsArrayBuffer(file);
        })
      })
    })
  }

  upload(blob:Blob){
    this.Fbref.child(this.currUser.uid).put(blob).then(savepic=>{
      this.picData['i'] = savepic.downloadURL
    });
  }

  takePic(){
    this.camera.getPicture({
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.CAMERA,
      encodingType:this.camera.EncodingType.PNG,
      saveToPhotoAlbum:true
    }).then(imagedata=>{
      this.picdata = imagedata;
      this.uploadPic();
    });
  }

  uploadPic(){
    this.mypicref.child(this.currUser.uid).putString(this.picdata,'base64', {contentType: 'image/png'})
      .then(savepic=>{
        this.picData['i'] = savepic.downloadURL
      })
  }

}
