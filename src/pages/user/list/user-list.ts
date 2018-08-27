import { Component, ChangeDetectorRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Events
} from "ionic-angular";
import { SubscriptionProvider } from "../../../providers/subscription/subscription";
import { Child } from "../../../models/user/child";
import { Adult } from "../../../models/user/adult";
import { LanguageService } from "../../../providers/language/language.service";
import { StatusService } from "../../../components/status/status.service";
import { Observable } from "rxjs/Observable";
import { REFRESH_USER_LIST } from "../../../app/events/events";

/**
 * Generated class for the UserListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-user-list",
  templateUrl: "user-list.html"
})
export class UserListPage {
  children: Child[] = [];
  users: Adult[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private subscriptionServ: SubscriptionProvider,
    private alertCtrl: AlertController,
    private langServ: LanguageService,
    private statusServ: StatusService,
    private cDetRef: ChangeDetectorRef,
    private events: Events
  ) {
    this.getList();
    this.subscribeEvents()
  }
  getList() {
    Observable.forkJoin(
      this.subscriptionServ.getUserList(),
      this.subscriptionServ.getChildrenList()
    ).subscribe(([users, children]) => {
      this.users = users;
      this.children = children;

      this.cDetRef.detectChanges();
    });
  }
  subscribeEvents() {
    this.events.subscribe(REFRESH_USER_LIST, () => {
      this.getList()
    })
  }

  forwardTo(page, params) {
    console.log("forwardTo", page, params);
    this.navCtrl.push(page, params);
  }
  forwardToAdult(item: Adult) {
    this.forwardTo("AdultItemPage", item);
  }

  forwardToChild(item: Child) {
    this.forwardTo("ChildItemPage", item);
  }

  forwardToNewChild() {
    let child = new Child(this.subscriptionServ.getCurrent().subscriptionId);
    this.forwardToChild(child);
  }
  forwardToNewAdult() {
    let adult = new Adult(this.subscriptionServ.getCurrent().subscriptionId);
    this.forwardToAdult(adult);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserListPage");
  }
  onDeleteUser(item: Adult | Child) {
    this.alertCtrl
      .create({
        message: this.langServ.getText("user.delete.confirm"),
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
              this.deleteUser(item);
            }
          }
        ]
      })
      .present();
  }
  deleteUser(item: Child | Adult) {
    this.subscriptionServ.deleteUser(item).subscribe(() => {
      this.statusServ.setSuccess(this.langServ.getText("user.delete.success"));
      this.getList();
    }),
      e => {
        this.statusServ.setSuccess(this.langServ.getText("user.delete.error"));
      };
  }
}
