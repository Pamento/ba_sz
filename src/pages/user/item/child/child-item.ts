import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";

import { StatusService } from "../../../../components/status/status.service";
import { LanguageService } from "../../../../providers/language/language.service";
import { Child } from "../../../../models/user/child";
import { SubscriptionProvider } from "../../../../providers/subscription/subscription";
import { REFRESH_USER_LIST } from "../../../../app/events/events";

/**
 * Generated class for the ChildItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-child-item",
  templateUrl: "child-item.html"
})
export class ChildItemPage {
  public form: FormGroup;
  public child: Child;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private subcriptionServ: SubscriptionProvider,
    private formBuilder: FormBuilder,
    private statusServ: StatusService,
    private langServ: LanguageService,
    private events: Events
  ) {
    this.child = this.navParams.data as Child;
    this.form = this.formBuilder.group({
      name: [this.child.name, Validators.compose([Validators.required])],
      username: [this.child.username, [Validators.required]],
      password: [
        this.child.password,
        Validators.compose([Validators.required])
      ],
      isViewProfile: [this.child.isViewProfile, Validators.compose([])],
      isViewAccount: [this.child.isViewAccount, Validators.compose([])],
      countOcr: [
        this.child.countOcr,
        Validators.compose([Validators.required, CustomValidators.number])
      ],
      profileId: [
        this.child.profileId,
        Validators.compose([CustomValidators.number])
      ]
    });
  }

  save() {
    console.log("save", this.form);
    this.form["submit"] = true;
    this.form["apiError"] = null;
    if (this.form.valid) {
      this.form["submitting"] = true;
      this.subcriptionServ.saveChild(this.child).subscribe(
        response => {
          console.log("save success", response);
          this.form["submitting"] = false;
          this.statusServ.setSuccess(
            this.langServ.getText("child.save.success")
          );
          this.events.publish(REFRESH_USER_LIST)
          this.navCtrl.pop()
        },
        e => {
          console.log("save error", e);
          this.form["apiError"] = e.error.message;
          this.form["submitting"] = false;
          this.statusServ.setError(
            this.langServ.getText("child.save.error")
          );
        }
      );
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChildItemPage");
  }
}
