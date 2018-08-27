import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";

import { User } from "../../models/user/user";

import { CountryProvider } from "../../providers/country/country";
import { CategoryProvider } from "../../providers/category/category";
import { StatusService } from "../../components/status/status.service";
import { LanguageService } from "../../providers/language/language.service";
import { UserService } from "../../providers/user/user.service";
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  profile: User;
  public form: FormGroup; 
  public countryList = <any>[];
  public categoryList = <any>[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private countryProvider: CountryProvider,
    private categoryProvider: CategoryProvider,
    private statusServ: StatusService,
    private langServ: LanguageService,
    private userServ: UserService
  ) {
    this.profile=this.userServ.getCurrentUser().initAddress();
    this.form = this.formBuilder.group({
      email: [this.profile.email, [Validators.required, CustomValidators.email]],
      username: [this.profile.name, Validators.compose([Validators.required])],
      country: [this.profile.countryId, Validators.compose([Validators.required])],
      category: [this.profile.group && this.profile.group.id, Validators.compose([Validators.required])],
      address1: [this.profile.address && this.profile.address.address1, Validators.compose([Validators.required])],
      address2: [this.profile.address && this.profile.address.address2, Validators.compose([])],
      postal: [this.profile.address && this.profile.address.postal, Validators.compose([Validators.required])],
      city: [this.profile.address && this.profile.address.city, Validators.compose([Validators.required])],
      phone: [this.profile.phone, Validators.compose([Validators.required])]
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

  save() {
    console.log("signIn", this.form);
    this.form["submit"] = true;
    this.form["apiError"] = null;
    if (this.form.valid) {
      this.form["submitting"] = true;
      this.userServ.save(this.profile).subscribe(
        response => {
          console.log("save success", response);
          this.form["submitting"] = false;
          this.statusServ.setSuccess(this.langServ.getText("profile.save.success"));
        },
        e => {
          console.log("save error", e);
          this.form["apiError"] = e.error.message;
          this.form["submitting"] = false;
          this.statusServ.setError(this.langServ.getText("profile.save.error"));
        }
      );
    }
  }
  forwardTo(page) {
    console.log("forwardTo", page);
    this.navCtrl.push(page);
  }
}
