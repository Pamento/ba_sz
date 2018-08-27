import { Component, ViewChild, HostListener } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ReadingProfile } from "../../../models/reading-profile/reading-profile";
import { TextAdaptProvider } from "../../../providers/text/adapt/text-adapt";
import { ReadingProfileProvider } from "../../../providers/reading-profile/reading-profile";
import { TextEditorComponent } from "../editor/text-editor";
import { PlatformService } from "../../../providers/platform/platform";
import { Keyboard } from '@ionic-native/keyboard';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

/**
 * Generated class for the TextCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-text-create",
  templateUrl: "text-create.html"
})
export class TextCreatePage {
  @ViewChild("textEditor") textEditor: TextEditorComponent;
  @HostListener("tap", ["$event"])
  onTap($event) {
    this.onPageTap($event)
  }
  onPageTap($event) {
    console.log("onPageTap")
    console.log($event.target)
    console.log(this.textEditor.ckEditor)
    if (this.textEditor.ckEditor.ck.nativeElement.contains($event.target)) {
      console.log("click inside editor")
    } else {
      console.log("click outside editor")
      if (this.platformServ.isiOS()) {
        this.textEditor.ckEditor.blur.emit()
        this.keyboard.close()
      }
    }
  }

  profile: ReadingProfile;
  text: string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private textAdapter: TextAdaptProvider,
    private readingProfileServ: ReadingProfileProvider,
    private platformServ: PlatformService,
    private keyboard: Keyboard
  ) {
    if (this.navParams.get("html")) {
      this.text = this.navParams.get("html");
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TextCreatePage");
  }
  onProfileSelected(id: number) {
    console.log("onProfileSelected", id, this.textEditor.getHtml());
    this.readingProfileServ.get(id).subscribe(profile => {
      this.profile = profile;
      if (this.textEditor.getHtml()) {
        this.adaptText().subscribe();
      }
    });
  }
  onSavedContent($event) {
    console.log("onSavedContent");
  }
  onSave(o: Observer<any>): Observer<string> {
    console.log('onSave', o)
    this.adaptText().subscribe((html) => {
      o.next(html)
      o.complete()
    })
    return o
  }
  onTextChange($event) {
    console.log("onTextChange", $event);
    if (this.profile) {
      this.adaptText().subscribe();
    }
  }
  adaptText(): Observable<string> {
    console.log('editor', this.textEditor);
    return this.textAdapter
      .adapt(this.textEditor.getHtml(), this.profile)
      .map(html => {
        this.textEditor.setHtml(html);
        return html
      });
  }
}
