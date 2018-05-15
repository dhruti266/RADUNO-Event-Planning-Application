import { Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, Platform, Events, ModalController} from 'ionic-angular';
import {Camera} from "@ionic-native/camera";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import firebase from "firebase";
import {File} from "@ionic-native/file";
import moment from "moment";
import {DefaultGreetingPage} from "../default-greeting/default-greeting";
import {EventSummaryPage} from "../event-summary/event-summary";
declare var window: any;
declare var fabric: any;
/**
 * Generated class for the GreetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-greeting',
  templateUrl: 'greeting.html'
})
export class GreetingPage {

 // @ViewChild('myCanvas') canvas: any;

  private canvas;
  private textArr: any = [];
  private selectedText;
  colors: any = [];
  public  selectedFontColor;
  public  selectedBackColor;
  public Fbref:any;
  picData: any;
  imageUrl: any;
  hostID: any;
  eventDetails = [];

  public selectedFontFamily;
  fontFamily = ['Arial', 'Georgia', 'Monaco', 'Hoefler Text', 'Courier', 'Calibri', 'Apple Chancery',
                'Avenir Next Condensed', 'Bodoni 72 Smallcaps', 'Brush Script MT', 'Chalkduster', 'Bradley Hand'];



  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, public camera: Camera, private afAuth:AngularFireAuth,
              private afDatabase :AngularFireDatabase, public file: File, public events: Events,
              public modalCtrl: ModalController) {

    this.eventDetails = this.navParams.get('event_details');
    console.log("sdsds", this.eventDetails);

    this.toast.create({
      message: `Event is successfully created.`,
      duration: 3000,
    }).present();

    this.colors.push({
      'colorName': 'Red',
      'colorCode': '#ff0000'
    });

    this.colors.push({
      'colorName': 'Blue',
      'colorCode': '#0000ff'
    });

    this.colors.push({
      'colorName': 'White',
      'colorCode': '#ffffff'
    });

    this.colors.push({
      'colorName': 'Black',
      'colorCode': '#000000'
    });

    this.colors.push({
      'colorName': 'Green',
      'colorCode': '#00ff00'
    });

  }

  ionViewWillEnter() {
    this.canvas = new fabric.Canvas('canvas');
  }


  addText(){

    var text = new fabric.IText("add text...", {
     fontFamily: 'Calibri',
     padding: 3,
     fontSize: 15,
     fill: '#000',
   });
    text.key = this.textArr.length ;
    this.textArr[text.key] = text;
    this.canvas.add(text);
    var self = this;
    text.on('selected', function() {
      self.selectedText = self.textArr[this['key']];
    });
  }

  removeText(){
    if(this.selectedText){
      this.canvas.remove(this.selectedText);
    }
    else{
      this.toast.create({
        message: `Select the object to remove`,
        duration: 3000,
      }).present();
    }
  }

  getSelectedFontFamily(){
    if(this.selectedText){
      this.selectedText.fontFamily = this.selectedFontFamily;
      this.canvas.renderAll();
    }
    else{
      this.toast.create({
            message: `Select the object`,
            duration: 3000,
      }).present();
    }

  }

  getSelectedBackColor(){
    this.canvas.setBackgroundImage(null);
    this.canvas.renderAll();
    this.canvas.backgroundColor = this.selectedBackColor;
      this.canvas.renderAll();
  }

  getSelectedFontColor(){
    if(this.selectedText){
      console.log(this.selectedFontColor);
      this.selectedText.set({fill: this.selectedFontColor});
      this.canvas.renderAll();
    }
    else{
      this.toast.create({
        message: `Select the object to apply color`,
        duration: 3000,
      }).present();
    }
  }

  getMedia(){
    this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      mediaType:this.camera.MediaType.ALLMEDIA,
      destinationType:this.camera.DestinationType.FILE_URI
    }).then(fileuri=>{

      window.resolveLocalFileSystemURL("file://"+fileuri, EF=>{
        EF.file(file=>{
          var fileReader = new FileReader();
          this.canvas.backgroundColor = 'White';
          this.canvas.renderAll();
          var self = this;
          fileReader.onload = function (e) {
            fabric.Image.fromURL(fileReader.result, function(img) {
              self.canvas.setBackgroundImage(img, self.canvas.renderAll.bind(self.canvas), {
                scaleX: self.canvas.width / img.width,
                scaleY: self.canvas.height / img.height
              });
            });
          };
          fileReader.readAsDataURL(file);
        });
      });
    })
  }


  clearCanvasBackground(){
    if(this.canvas.backgroundImage != null){
      this.canvas.setBackgroundImage(null);
      this.canvas.renderAll();
    }
    else if(this.selectedBackColor){
      this.canvas.backgroundColor = 'White';
      this.canvas.renderAll();
    }
    else {
      this.toast.create({
        message: `Canvas background is already cleared`,
        duration: 3000,
      }).present();
    }

  }


  saveGreeting(){
    var canvasLength = this.canvas.getObjects()['length'];
    if(canvasLength != 0){
      var currentDate = moment();
      var fileName = 'file_' + currentDate.format("YYYY_DD_MM_HH_mm_ss") + '.jpg';
      var self = this;

      var greeting = self.canvas.toDataURL('svg');

     // saves image on database
     //  this.afAuth.authState.take(1).subscribe(auth => {
     //    this.hostID = auth.uid;
     //    console.log(this.hostID);
     //    this.afDatabase.list(`greeting`)
     //      .push({"hostID":this.hostID, "greetingCard": greeting})
     //      .then(() => this.navCtrl.push(GreetingPage));
     //  });

      //saves images locally on user device
      var folderpath = "file:///storage/emulated/0/";

      // Split the base64 string in data and contentType
      var block = greeting.split(";");

      // get the real base64 content of the file
      var realData = block[1].split(",")[1];

      const bytes: string = atob(realData);
      const byteNumbers = new Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) {
        byteNumbers[i] = bytes.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob: Blob = new Blob([byteArray], { type: 'image/png' });
      this.file.writeFile(folderpath, fileName, blob);
      this.navCtrl.push(EventSummaryPage, { image: greeting, event_details: this.eventDetails });
    }
    else {
      this.toast.create({
        message: `Please add atleast one text to make greeting`,
        duration: 3000,
      }).present();
    }
  }

  useDefaultGreeting() {

    var self = this;
    this.events.subscribe('imageUrl', (_params) => {
      this.clearCanvasBackground();
      fabric.Image.fromURL(_params.url, function(img) {
        console.log(self.canvas.width / img.width);
        console.log(self.canvas.height / img.height);
        self.canvas.setBackgroundImage(img, self.canvas.renderAll.bind(self.canvas), {
          scaleX: (self.canvas.width / img.width),
          scaleY: (self.canvas.height / img.height)
        });
      });
      this.events.unsubscribe('imageUrl');
      this.canvas.renderAll();
    });
    let modal = this.modalCtrl.create(DefaultGreetingPage);
    modal.present();
  }

}
