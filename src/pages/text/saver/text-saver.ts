import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ReadingProfile } from "../../../models/reading-profile/reading-profile";
import { TextProvider } from "../../../providers/text/text";
import { FileManagerService } from "../../../components/file-manager/file-manager";
import { PlatformService } from "../../../providers/platform/platform";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { StatusService } from "../../../components/status/status.service";
import { LanguageService } from "../../../providers/language/language.service";

/**
 * Generated class for the TextSaverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "text-saver",
  templateUrl: "text-saver.html"
})
export class TextSaverComponent {
  @Input() content: string;
  @Input() profile: ReadingProfile;
  @Output() onSavedContent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSave: EventEmitter<Observer<any>> = new EventEmitter<Observer<any>>();

  type: ".odt" | ".docx" | ".doc" = ".docx";
  authorizedExtensions = [".odt", ".docx", ".doc"];
  constructor(
    private textServ: TextProvider,
    private fileManager: FileManagerService,
    public platformServ: PlatformService,
    private statusServ: StatusService,
    private langServ: LanguageService
  ) {
    console.log("Hello TextSaverComponent Component");
  }
  save() {
    Observable.create((observer: Observer<any>) => {
      this.onSave.emit(observer)
    })
      .subscribe((html: any) => {
        this.content = html
        console.log("save", html, this.content, this.type, this.profile);
        let fileName = (this.profile ? this.profile.name : "document") + this.type;
        this.textServ
          .convertHtml(this.content, this.profile && this.profile.id, fileName)
          .subscribe(
            (b: Blob) => {
              this.fileManager.writeAndOpen(b, fileName).subscribe((r) => {
                console.log('writeAndOpen', r);
                this.onSavedContent.emit(r)
              },
            ()=>{
              this.statusServ.setError(this.langServ.getText("text.open.error"))
            })
            },
            e => {
              console.log("convertHtml error", e);
            }
          );
      })
  }
}
