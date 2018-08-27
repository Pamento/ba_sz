import { Component, ViewChild, HostListener } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SpeechRecognition, SpeechRecognitionListeningOptions } from "@ionic-native/speech-recognition";
import { StatusService } from "../../../components/status/status.service";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { TextAdaptProvider } from "../../../providers/text/adapt/text-adapt";
import { ReadingProfileProvider } from "../../../providers/reading-profile/reading-profile";
import { ReadingProfile } from "../../../models/reading-profile/reading-profile";
import { TextEditorComponent } from "../editor/text-editor";
import { PlatformService } from "../../../providers/platform/platform";
import { Keyboard } from '@ionic-native/keyboard';
import { Observer } from "rxjs/Observer";

const french="fr-FR"
/**
 * Generated class for the TextSpellerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-text-speller",
  templateUrl: "text-speller.html",
  providers: [SpeechRecognition]
})
export class TextSpellerPage {
  @ViewChild("textEditor") textEditor: TextEditorComponent;
  @HostListener("tap", ["$event"])
  onTap($event){
    this.onPageTap($event)
  }
  onPageTap($event){
    console.log("onPageTap")
    console.log($event.target)
    console.log(this.textEditor.ckEditor)
    if (this.textEditor.ckEditor.ck.nativeElement.contains($event.target)){
      console.log("click inside editor")
    } else {
      console.log("click outside editor")  
      if (this.platformServ.isiOS()){
        this.textEditor.ckEditor.blur.emit()
        this.keyboard.close()
      }
    }
  }
  profile: ReadingProfile;
  supportedLanguages: string[] = [];
  language: string = french
  spelledText: string = "";
  hasSpelledText: boolean =false
  spelledTexts: string[] = null;
  isListening = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private speechRecognition: SpeechRecognition,
    private statusServ: StatusService,
    private textAdapter: TextAdaptProvider,
    private readingProfileServ: ReadingProfileProvider,
    private platformServ: PlatformService,
    private keyboard: Keyboard
  ) { }

  ionViewDidLoad() {
    console.log("ionViewDidLoad TextSpellerPage");
  }
  ionViewCanEnter(): Promise<boolean> {
    return this.checkFeature().toPromise();
  }
  checkFeature(): Observable<boolean> {
    return new Observable<boolean>(o => {
      Observable.forkJoin(
        fromPromise(this.speechRecognition.hasPermission()),
        fromPromise(this.speechRecognition.isRecognitionAvailable()),
      ).subscribe(([hasPermission, isAvailable]) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission().then(
            granted => {
              if (isAvailable) {
                o.next(true);
                o.complete();
              }
            },
            denied => {
              this.statusServ.setError("text.speller.notPermitted");
              o.next(false);
              o.complete();
            }
          );
        }
        if (!isAvailable) {
          this.statusServ.setError("text.speller.notAvailable");
          o.next(false);
          o.complete();
        }
        if (hasPermission && isAvailable) {
          o.next(true);
          o.complete();
        }
      });
    });
  }
  startListening() {
    this.isListening = true;
    let options: SpeechRecognitionListeningOptions = {
      showPartial:true,
      language:this.language
    }
    this.speechRecognition.startListening(options).subscribe(spelledTexts => {
      this.spelledTexts = spelledTexts;
      this.isListening = false;
    });
  }
  stopListening() {
    this.speechRecognition.stopListening().then(r => {
      console.log("stopped", r);
      this.isListening = false;
    });
  }
  select(text) {
    this.hasSpelledText = true
    this.closeChoices();
    if (this.textEditor.isFocused()){
      this.textEditor.insertHtml(text);
    } else {
      this.textEditor.addHtml(text);
    }
    if (this.profile) {
      this.adaptText();
    }
  }
  noSelect() {
    this.closeChoices();
  }
  closeChoices() {
    this.spelledTexts = null;
  }
  onProfileSelected(id: number) {
    console.log("onProfileSelected", id);
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
  onSave(o: Observer<any>): Observer<string> {
    console.log('onSave', o)
    this.adaptText().subscribe((html) => {
      o.next(html)
      o.complete()
    })
    return o
  }

}
