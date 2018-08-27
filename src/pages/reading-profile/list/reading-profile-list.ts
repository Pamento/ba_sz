import { Component, ChangeDetectorRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  AlertController
} from "ionic-angular";
import { ReadingProfileProvider } from "../../../providers/reading-profile/reading-profile";
import { ReadingProfile } from "../../../models/reading-profile/reading-profile";
import { READING_PROFILE_LIST_REFRESH } from "../../../app/events/events";
import { LanguageService } from "../../../providers/language/language.service";
import { StatusService } from "../../../components/status/status.service";
/**
 * Generated class for the ReadingProfileListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-reading-profile-list",
  templateUrl: "reading-profile-list.html"
})
export class ReadingProfileListPage {
  list: ReadingProfile[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private readingProfileServ: ReadingProfileProvider,
    private events: Events,
    private cDetRef: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private langServ: LanguageService,
    private statusServ: StatusService
  ) {
    this.events.subscribe(READING_PROFILE_LIST_REFRESH, () => {
      this.getList(false);
    });
    this.getList();
  }
  getList(loader: boolean = true) {
    this.readingProfileServ.getList({loader}).subscribe(list => {
      list.forEach((i)=>{
        if (!i.leaf){
          i["open"]=true
        }
      })
      this.list = list;
      this.cDetRef.detectChanges();
      console.log("list", list);
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReadingProfileListPage");
  }

  forwardTo(page, params) {
    console.log("forwardTo", page, params);
    this.navCtrl.push(page, params);
  }
  forwardToItem(item: ReadingProfile) {
    this.forwardTo("ReadingProfileItemPage", item);
  }
  forwardToNewItem() {
    this.forwardTo("ReadingProfileItemPage", new ReadingProfile());
  }
  onDeleteProfile(item: ReadingProfile) {
    this.alertCtrl
      .create({
        message: this.langServ.getText("readingProfile.delete.confirm"),
        buttons: [
          {
            text: this.langServ.getText("cancel"),
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          },
          {
            text: this.langServ.getText("confirm"),
            handler: () => {
              this.deleteProfile(item);
            }
          }
        ]
      })
      .present();
  }
  deleteProfile(item: ReadingProfile) {
    this.readingProfileServ.delete(item).subscribe(() => {
      this.statusServ.setSuccess(
        this.langServ.getText("readingProfile.delete.success")
      );
      this.getList();
    }),
      e => {
        this.statusServ.setSuccess(
          this.langServ.getText("readingProfile.delete.error")
        );
      };
  }
  isFolderOpen(item:ReadingProfile):boolean{
    return item["open"]==true
  }
  toggleFolder(item:ReadingProfile){
    item["open"]=!item["open"]
  }
  getFolderIcon(item:ReadingProfile):string{
    return this.isFolderOpen(item) ? 'ios-arrow-down' : 'ios-arrow-up' 
  }
}
