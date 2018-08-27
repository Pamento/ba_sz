import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { User } from "../../models/user/user";

import { StatusService } from "../../components/status/status.service";
import { LanguageService } from "../../providers/language/language.service";
import { UserService } from "../../providers/user/user.service";

/**
 * Generated class for the ResetPwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-reset-pwd",
  templateUrl: "reset-pwd.html"
})
export class ResetPwdPage {
  profile: User;
  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private statusServ: StatusService,
    private langServ: LanguageService,
    private userServ: UserService
  ) {
    this.profile = this.userServ.getCurrentUser();
    this.form = this.formBuilder.group({
      oldPassword: [null, Validators.compose([Validators.required])],
      newPassword: [null, Validators.compose([Validators.required])],
      newPasswordConfirm: [null, Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ResetPwdPage");
  }

  resetPwd() {
    console.log("resetPwd", this.form);
    this.form["submit"] = true;
    this.form["apiError"] = null;
    if (this.form.valid) {
      this.form["submitting"] = true;
      let oldPwd = this.form.controls["oldPassword"].value;
      let newPassword = this.form.controls["newPassword"].value;
      let newPasswordConfirm = this.form.controls["newPasswordConfirm"].value;
      this.userServ
        .changePwd(oldPwd, newPassword, newPasswordConfirm)
        .subscribe(
          response => {
            console.log("resetPwd success", response);
            this.form["submitting"] = false;
            this.statusServ.setSuccess(
              this.langServ.getText("resetPwd.success")
            );
          },
          e => {
            console.log("resetPwd error", e);
            this.form["apiError"] = e.error.message;
            this.form["submitting"] = false;
            this.statusServ.setError(this.langServ.getText("resetPwd.error"));
          }
        );
    }
  }
}
