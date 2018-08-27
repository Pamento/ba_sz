import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
const DEFAULT_SIZE = "16px";
/**
 * Generated class for the FontSizePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "font-size-picker",
  templateUrl: "font-size-picker.html"
})
export class FontSizePickerComponent implements OnInit {
  @Input() size: string;
  @Input() sizes: { label: string; value: string }[];
  @Output("change") change: EventEmitter<string> = new EventEmitter();

  constructor() {
    console.log("Hello FontSizePickerComponent Component");
  }
  ngOnInit() {
    if (!this.size) {
      this.size = DEFAULT_SIZE;
      console.log("default size update", this.size);
    }
  }

  sizeChange() {
    this.change.emit(this.size);
  }
}
