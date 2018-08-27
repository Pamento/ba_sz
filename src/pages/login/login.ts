import { Component, ChangeDetectorRef } from "@angular/core";
import { NavController, Events, IonicPage } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { AuthenticationService } from "../../providers/auth/auth.service";
import { IS_USER_LOGGED_IN } from "../../providers/auth/auth.service";
import { StatusService } from "../../components/status/status.service";
import { LanguageService } from "../../providers/language/language.service";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  rootPage;
  public form: FormGroup;
  public email: string;
  public password: string;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authServ: AuthenticationService,
    private events: Events,
    private cDetRef: ChangeDetectorRef,
    private statusServ: StatusService,
    private langServ: LanguageService
  ) {
    this.form = this.formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password: ["", Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }
  login() {
    this.form["submit"] = true;
    this.form["apiError"] = null;
    if (this.form.valid) {
      this.form["submitting"] = true;
      this.authServ.login(this.email, this.password).subscribe(
        response => {
          console.log("login success", response);
          this.events.publish(IS_USER_LOGGED_IN, response);
          this.navCtrl.setRoot("TabsPage");
          this.form["submitting"] = false;
          this.statusServ.setSuccess(this.langServ.getText("login.success"));
        },
        e => {
          console.log("login error", e);
          this.form["apiError"] = e.error && e.error.message;
          this.form["submitting"] = false;
          this.statusServ.setError(this.langServ.getText("login.error"));
        }
      );
    }
  }
  resetErrors() {
    if (this.form["submit"]) {
      this.form["submit"] = false;
      this.form["apiError"] = null;
      this.cDetRef.detectChanges();
    }
  }
  forwardTo(page) {
    console.log("forwardTo", page);
    this.navCtrl.push(page);
  }
  resetPwd() { }
}
