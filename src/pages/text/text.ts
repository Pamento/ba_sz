import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the TextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-text",
  templateUrl: "text.html"
})
export class TextPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TextPage");
  }
  forwardTo(page) {
    console.log("forwardTo", page);
    this.navCtrl.push(page);
  }
  onNewTextClick() {
    this.forwardTo("TextCreatePage");
  }
  onLoadTextClick() {
    this.forwardTo("TextImportPage");
  }
  onLoadImgClick() {
    this.forwardTo("TextImagePage");
  }
  onSpellTextClick() {
    this.forwardTo("TextSpellerPage");
  }
}
