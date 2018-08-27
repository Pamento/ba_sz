import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TextAdaptModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-text-adapt-modal',
  templateUrl: 'text-adapt-modal.html',
})
export class TextAdaptModalPage {
  html:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.html = this.navParams.get("html")
    console.log("html",this.html);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TextAdaptModalPage');
  }

}
