import { Component, Input, EventEmitter, Output } from "@angular/core";
import { ModalController } from "ionic-angular";
import { ColorPickerSelectorComponent } from "./selector/color-picker-selector"
const DEFAULT_COLORS = [
  "#000000",
  "#FF82AB",
  "#EE799F",
  "#CD6889",
  "#8B475D",
  "#FF34B3",
  "#EE30A7",
  "#CD2990",
  "#8B1C62",
  "#FF00FF",
  "#EE00EE",
  "#CD00CD",
  "#8B008B",
  "#4876FF",
  "#436EEE",
  "#3A5FCD",
  "#27408B",
  "#4682B4",
  "#00BFFF",
  "#00B2EE",
  "#009ACD",
  "#00688B",
  "#00FF7F",
  "#00EE76",
  "#00CD66",
  "#008B45",
  "#FFFF00",
  "#EEEE00",
  "#CDCD00",
  "#8B8B00",
  "#FF8C00",
  "#FF7F00",
  "#EE7600",
  "#CD6600",
  "#8B4500",
  "#EECBAD",
  "#CDAF95",
  "#8B7765",
  "#FF7D40",
  "#FF6103",
  "#8A360F",
  "#A0522D",
  "#FF7F50",
  "#FF4500",
  "#EE4000",
  "#CD3700",
  "#8B2500",
  "#5E2612",
  "#FA8072",
  "#FF3030",
  "#EE2C2C",
  "#CD2626",
  "#8B1A1A",
  "#A9A9A9",
  "#808080",
  "#696969"
];

/**
 * Generated class for the ColorPickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "color-picker",
  templateUrl: "color-picker.html",
  entryComponents:[ColorPickerSelectorComponent]
})
export class ColorPickerComponent {
  @Input() color: string = DEFAULT_COLORS[0];
  @Input() colors: string[] = DEFAULT_COLORS;
  @Input() title:string;
  @Output("change") change: EventEmitter<string> = new EventEmitter();
  isOpen: boolean = false;
  constructor(
    private modalCtrl: ModalController
  ) {
    console.log("Hello ColorPickerComponent Component");
  }
  open() {
    let modal = this.modalCtrl.create(ColorPickerSelectorComponent,{colors:this.colors,color:this.color,title:this.title})
    modal.onDidDismiss((color)=>{
      if (color){
        this.select(color)
      }
    })
    modal.present()
  }
  select(color: string) {
    console.log("color select",color)
    this.color = color;
    this.change.emit(this.color);  
  }
}
