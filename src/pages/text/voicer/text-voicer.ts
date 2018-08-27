import { Component, Input } from "@angular/core";
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { PlatformService } from "../../../providers/platform/platform";

/**
 * Generated class for the TextVoicerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "text-voicer",
  templateUrl: "text-voicer.html",
  providers: [TextToSpeech]
})
export class TextVoicerComponent {
  @Input() text: string;
  isSpeeching: boolean = false
  language: string = 'fr-FR'
  constructor(
    private tts: TextToSpeech,
    private platformServ: PlatformService
  ) {
    console.log("Hello TextVoicerComponent Component");
  }

  onTalk() {
    this.isSpeeching = true
    let params : any= { text: this.text, locale: this.language }
    if (this.platformServ.isiOS()){
      params.rate = 1.5
    }
    this.tts.speak(params)
      .then(
        (msg) => {
          console.log(msg);
          this.isSpeeching = false
        },
        (err) => {
          console.log(err);
          this.isSpeeching = false
        }
      );
  }

  onStop() {
    this.isSpeeching = false
    this.tts.speak('').then(
      (msg) => {
        console.log(msg);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
