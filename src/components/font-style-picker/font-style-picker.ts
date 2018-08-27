import { Component, Input, EventEmitter, Output } from "@angular/core";

/**
 * Generated class for the StylePickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "font-style-picker",
  templateUrl: "font-style-picker.html"
})
export class FontStylePickerComponent {
  @Input() bold: boolean = false;
  @Input() italic: boolean = false;
  @Input() underline: boolean = false;
  @Output("boldChange") boldChange: EventEmitter<boolean> = new EventEmitter();
  @Output("italicChange")
  italicChange: EventEmitter<boolean> = new EventEmitter();
  @Output("underlineChange")
  underlineChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    console.log("Hello FontStylePickerComponent Component");
  }
  toggleBold() {
    this.bold = !this.bold;
    this.boldChange.emit(this.bold);
  }
  toggleItalic() {
    this.italic = !this.italic;
    this.italicChange.emit(this.italic);
  }
  toggleUnderline() {
    this.underline = !this.underline;
    this.underlineChange.emit(this.underline);
  }
}
