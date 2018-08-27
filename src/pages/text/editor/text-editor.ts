import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import { CKEditorComponent } from "ngx-ckeditor";
import { ModalController } from "ionic-angular";

/**
 * Generated class for the TextEditorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "text-editor",
  templateUrl: "text-editor.html"
})
export class TextEditorComponent implements AfterViewInit {
  showOptions: boolean = false
  @ViewChild("ckEditor") ckEditor: CKEditorComponent;
  ckeConfig: any = {
    allowedContent: true,
    language:"fr"
  };
  @Input() private html: string = "";
  @Output() onTextChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private modalCtrl: ModalController
  ) {
    console.log("Hello TextEditorComponent Component");
  }
  ngAfterViewInit() {
    this.registerEvents()
    this.initHtml(this.html)
  }
  registerEvents() {
    this.ckEditor.instance
      .on('doubleclick', (e) => {
        console.log('doubleclick');
        this.onEditorDbClick(e)
      })
    console.log('events registered')
  }
  onChange(html) {
    this.onTextChange.emit(html);
  }
  getText(): string {
    return this.ckEditor.instance && this.ckEditor.instance.document && this.ckEditor.instance.document.getBody().getText()
  }
  getHtml(): string {
    return this.ckEditor.instance && this.ckEditor.instance.document && this.ckEditor.instance.document.getBody().getHtml();
  }
  setHtml(html) {
    this.ckEditor.instance.document.getBody().setHtml(html);
  }
  initHtml(html) {
    this.ckEditor.instance.setData(html);
  }
  insertHtml(html: string) {
    console.log("insertHtml", html);
    this.ckEditor.instance.insertHtml(html)
  }
  addHtml(html: string) {
    console.log("addHtml", html);
    this.setHtml(this.getHtml() + html)
  }
  getIcon(): string {
    return this.showOptions ? "ios-arrow-up" : "ios-arrow-down"
  }
  isFocused() {
    console.log('isFocused', this.ckEditor);
    return this.ckEditor.instance.focusManager.hasFocus
  }
  toggleOptions() {
    this.showOptions = !this.showOptions
  }
  onEditorDbClick($event) {
    console.log('onEditorDbClick');
    let modal = this.modalCtrl.create('TextEditorModalPage', { html: this.getHtml() })
    modal
      .onDidDismiss((html) => {
        console.log('TextEditorModal', html);
        this.setHtml(html)
        this.onChange(html)
      })
    modal.present()
  }
}
