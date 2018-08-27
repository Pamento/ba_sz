import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../../../models/user/user";
import { CountryProvider } from "../../../providers/country/country";
import { UserService } from "../../../providers/user/user.service";
import { OffersProvider } from "../../../providers/offers/offers";
import { OrderProvider } from "../../../providers/order/order";

/**
 * Generated class for the OffersStep4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-offers-step4",
  templateUrl: "offers-step4.html"
})
export class OffersStep4Page {
  invoiceProfile: User;
  public form: FormGroup;
  public countryList = <any>[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private countryProvider: CountryProvider,
    private userServ: UserService,
    private offersServ: OffersProvider,
    private orderSev: OrderProvider
  ) {
    this.invoiceProfile = new User();
    this.invoiceProfile.name = this.userServ.getCurrentUser().name;
    this.orderSev.getAddress().subscribe(address => {
      this.invoiceProfile.address = address;
    });
    this.form = this.formBuilder.group({
      username: [
        this.invoiceProfile.name,
        Validators.compose([Validators.required])
      ],
      country: [
        this.invoiceProfile.address && this.invoiceProfile.address.countryId,
        Validators.compose([Validators.required])
      ],

      address1: [
        this.invoiceProfile.address && this.invoiceProfile.address.address1,
        Validators.compose([Validators.required])
      ],
      address2: [
        this.invoiceProfile.address && this.invoiceProfile.address.address2,
        Validators.compose([])
      ],
      postal: [
        this.invoiceProfile.address && this.invoiceProfile.address.postal,
        Validators.compose([Validators.required])
      ],
      city: [
        this.invoiceProfile.address && this.invoiceProfile.address.city,
        Validators.compose([Validators.required])
      ],
      phone: [
        this.invoiceProfile.address && this.invoiceProfile.address.phone,
        Validators.compose([Validators.required])
      ]
    });
    this.countryProvider.getList().subscribe(list => {
      this.countryList = list;
    });
  }
  onCountryChange(countryId) {
    this.invoiceProfile.address.countryName = this.countryList.find(
      c => c.id == countryId
    ).name;
    console.log(
      "onCountryChange",
      countryId,
      this.invoiceProfile.address.countryName
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OffersStep4Page");
  }

  forwardTo(page) {
    console.log("forwardTo", page);
    this.navCtrl.push(page);
  }
  submit() {
    this.form["submit"] = true;
    if (this.form.valid) {
      this.offersServ.setInvoiceProfile(this.invoiceProfile);
      this.forwardTo("OffersStep5Page");
    }
  }
}
