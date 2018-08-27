import { Component } from "@angular/core";
import { IonicPage, App, NavController } from "ionic-angular";
import { AuthenticationService } from "../../providers/auth/auth.service";
import { User } from "../../models/user/user";
import { UserService } from "../../providers/user/user.service";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-account",
  templateUrl: "account.html"
})
export class AccountPage {
  public user: User;
  constructor(
    private navCtrl: NavController,
    private appCtrl: App,
    private authServ: AuthenticationService,
    private userServ: UserService
  ) {
    this.user = this.userServ.getCurrentUser();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AccountPage");
  }

  forwardTo(page) {
    console.log("forwardTo", page);
    this.navCtrl.push(page);
  }

  logout() {
    this.authServ.logout().subscribe(() => {
      this.appCtrl.getRootNavs()[0].setRoot("LoginPage");
    });
  }
}
