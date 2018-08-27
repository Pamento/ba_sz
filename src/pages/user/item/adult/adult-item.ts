import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";

import { StatusService } from "../../../../components/status/status.service";
import { LanguageService } from "../../../../providers/language/language.service";
import { Adult } from "../../../../models/user/adult";
import { SubscriptionProvider } from "../../../../providers/subscription/subscription";
import { REFRESH_USER_LIST } from "../../../../app/events/events";


/**
 * Generated class for the AdultItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adult-item',
  templateUrl: 'adult-item.html',
})
export class AdultItemPage {
  public form: FormGroup;
  public adult: Adult;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private subcriptionServ: SubscriptionProvider,
    private formBuilder: FormBuilder,
    private statusServ: StatusService,
    private langServ: LanguageService,
    private events: Events
  ) {
    this.adult = this.navParams.data as Adult
    this.form = this.formBuilder.group({
      name: [this.adult.name, Validators.compose([Validators.required])],
      username: [this.adult.username, [Validators.required]],
      password: [
        this.adult.password,
        Validators.compose([Validators.required])
      ],
      accessAdmin: [this.adult.accessAdmin, Validators.compose([])],
      accessProfiles: [this.adult.accessProfiles, Validators.compose([])],
      countOcr: [
        this.adult.countOcr,
        Validators.compose([Validators.required, CustomValidators.number])
      ]
    });
  }

  save() {
    console.log("save", this.form);
    this.form["submit"] = true;
    this.form["apiError"] = null;
    if (this.form.valid) {
      this.form["submitting"] = true;
      this.subcriptionServ.saveAdult(this.adult).subscribe(
        response => {
          console.log("save success", response);
          this.form["submitting"] = false;
          this.statusServ.setSuccess(
            this.langServ.getText("adult.save.success")
          );
          this.events.publish(REFRESH_USER_LIST)
          this.navCtrl.pop()
        },
        e => {
          console.log("save error", e);
          this.form["apiError"] = e.error.message;
          this.form["submitting"] = false;
          this.statusServ.setError(
            this.langServ.getText("adult.save.error")
          );
        }
      );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdultItemPage');
  }

}
