import { Component } from "@angular/core";
import { ViewController, NavParams } from "ionic-angular";
@Component({
  selector: "color-picker-selector",
  templateUrl: "color-picker-selector.html"
})
export class ColorPickerSelectorComponent {
  color: string;
  colors: string[];
  title: string;

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
    console.log("Hello ColorPickerComponent Component");
    this.colors = this.navParams.get("colors");
    this.color = this.navParams.get("color");
    this.title = this.navParams.get("title");
  }
  select(color: string) {
    this.viewCtrl.dismiss(color);
  }
}
