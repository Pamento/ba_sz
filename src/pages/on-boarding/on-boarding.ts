import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the OnBoardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-on-boarding',
  templateUrl: 'on-boarding.html',
})
export class OnBoardingPage {

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnBoardingPage');
  }

  close() {
    console.log("close");
    this.viewCtrl.dismiss();
  }

}
