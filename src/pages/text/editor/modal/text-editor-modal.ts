import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavParams, ViewController, IonicPage } from "ionic-angular";

@IonicPage()
@Component({
    selector: "text-editor-modal",
    templateUrl: "text-editor-modal.html"
})
export class TextEditorModalPage {
    @ViewChild("textContent") textContent: ElementRef
    html: string
    constructor(
        private navParams: NavParams, private viewCtrl: ViewController
    ) {
        this.html = this.navParams.get('html')
        console.log('html', this.html);

    }
    close() {
        let html = this.textContent.nativeElement.innerHTML
        console.log('html', html);
        this.viewCtrl.dismiss(html)
    }
}