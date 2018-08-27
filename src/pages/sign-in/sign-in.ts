import { Component } from "@angular/core";
import { IonicPage, NavController, Events, NavParams, ModalController } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";

import { User } from "../../models/user/user";

import { AuthenticationService } from "../../providers/auth/auth.service";
import { IS_USER_LOGGED_IN } from "../../providers/auth/auth.service";
import { CountryProvider } from "../../providers/country/country";
import { CategoryProvider } from "../../providers/category/category";
import { StatusService } from "../../components/status/status.service";
import { LanguageService } from "../../providers/language/language.service";
import { AppValidators } from "../../components/validators/validators";

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-sign-in",
  templateUrl: "sign-in.html"
})
export class SignInPage {
  public form: FormGroup;
  public user: User = new User();
  public countryList = <any>[];
  public categoryList = <any>[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authServ: AuthenticationService,
    private events: Events,
    private formBuilder: FormBuilder,
    private countryProvider: CountryProvider,
    private categoryProvider: CategoryProvider,
    private statusServ: StatusService,
    private langServ: LanguageService,
    private modalCtrl: ModalController
  ) {
    this.form = this.formBuilder.group({
      email: [this.user.email, [Validators.required, CustomValidators.email],[AppValidators.emailAvailable(this.authServ,'isEmailAvailable')]],
      password: [this.user.password, Validators.compose([Validators.required])],
      username: [this.user.name, Validators.compose([Validators.required])],
      gender: [this.user.greetingId, Validators.compose([Validators.required])],
      country: [this.user.countryId, Validators.compose([Validators.required])],
      category: [this.user.groupId, Validators.compose([Validators.required])]
    });
    this.countryProvider.getList().subscribe(list => {
      this.countryList = list;
    });
    this.categoryProvider.getList().subscribe(list => {
      this.categoryList = list;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignInPage");
  }

  signIn() {
    console.log("signIn", this.form);
    this.form["submit"] = true;
    this.form["apiError"] = null;
    if (this.form.valid) {
      this.form["submitting"] = true;
      this.authServ.signIn(this.user).subscribe(
        response => {
          console.log("signIn success", response);
          this.events.publish(IS_USER_LOGGED_IN, response);
          this.navCtrl.setRoot("TabsPage");
          this.modalCtrl.create('OnBoardingPage',null,{cssClass:'fullscreen-modal'}).present();
          this.form["submitting"] = false;
          this.statusServ.setSuccess(this.langServ.getText("signin.success"));
        },
        e => {
          console.log("signIn error", e);
          this.form["apiError"] = e.error.message;
          this.form["submitting"] = false;
          this.statusServ.setError(this.langServ.getText("signin.error"));
        }
      );
    }
  }
  forwardTo(page) {
    console.log("forwardTo", page);
    this.navCtrl.push(page);
  }
}
