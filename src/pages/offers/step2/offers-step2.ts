import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Offer } from "../../../models/offer/offer";
import { LanguageService } from "../../../providers/language/language.service";
import { OffersProvider } from "../../../providers/offers/offers";
import { CustomValidators } from "ng2-validation";
/**
 * Generated class for the OffersStep2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-offers-step2",
  templateUrl: "offers-step2.html"
})
export class OffersStep2Page {
  offer: Offer;
  extraOffer: Offer;
  public form: FormGroup;
  public extraProfileNumber: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private langServ: LanguageService,
    private offersServ: OffersProvider
  ) {
    this.offer = this.offersServ.getSelectedOffer();
    let fn = this.offer.value == "APB" ? "getAnualExtra" : "getMonthlyExtra";
    this.offersServ[fn]().subscribe(extraOffer => {
      this.extraOffer = extraOffer;
      this.offersServ.setExtraOffer(extraOffer);
    });
    this.form = this.formBuilder.group({
      extraProfileNumber: [
        0,
        Validators.compose([Validators.required, CustomValidators.min(0)])
      ]
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OffersStep2Page");
  }

  forwardTo(page) {
    console.log("forwardTo", page);
    this.navCtrl.push(page);
  }
  submit() {
    this.form["submit"] = true;
    if (this.form.valid) {
      this.offersServ.setExtraProfileNumberSelected(this.extraProfileNumber);
      this.forwardTo("OffersStep3Page");
    }
  }
  getOfferLabel() {
    switch (this.offer.value) {
      case "APB":
        return this.langServ.getText("offers.step2.offer2");
      case "MPB":
        return this.langServ.getText("offers.step2.offer1");
    }
  }

  getMonthlyTotal() {
    return (
      this.offer.price / 12 +
      this.extraProfileNumber * this.getExtraMonthPrice()
    );
  }
  getExtraMonthPrice(): number {
    return this.extraOffer && this.extraOffer.price / 12;
  }
}
