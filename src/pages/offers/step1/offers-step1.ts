import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StatusService } from "../../../components/status/status.service";
import { LanguageService } from "../../../providers/language/language.service";
import { SubscriptionProvider } from "../../../providers/subscription/subscription";
import { Offer } from "../../../models/offer/offer";
import { OffersProvider } from "../../../providers/offers/offers";
import { Price } from "../../../pipes/pipes";
/**
 * Generated class for the OffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-offers-step1",
  templateUrl: "offers-step1.html"
})
export class OffersStep1Page {
  offers: Offer[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private statusServ: StatusService,
    private langServ: LanguageService,
    private subscriptionServ: SubscriptionProvider,
    private offersServ: OffersProvider
  ) {
    this.getOffers();
  }
  getOffers() {
    this.offersServ.getList().subscribe(list => {
      this.offers = list;
      console.log("offers list", list);
    });
  }

  ionViewCanEnter(): boolean {
    let authorized = !this.subscriptionServ.hasPayingOfferPending();
    if (!authorized) {
      this.statusServ.setError(this.langServ.getText("offers.unauthorized"));
    }
    return authorized;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OffersPage");
  }

  forwardTo(page, params?) {
    console.log("forwardTo", page, params);
    this.navCtrl.push(page, params);
  }
  selectOffer(offer: Offer) {
    this.offersServ.setSelectedOffer(offer);
    this.forwardTo("OffersStep2Page");
  }
  getOfferDescription(offer: Offer): string {
    switch (offer.value) {
      case "APB":
        return this.langServ.getText("offers.individuals.anual", {
          price: this.getOfferMonthPrice(offer)
        });
      case "MPB":
        return this.langServ.getText("offers.individuals.monthly", {
          price: this.getOfferMonthPrice(offer)
        });
      case "MPB":
    }
  }
  getOfferSubTitle(offer: Offer): string {
    switch (offer.value) {
      case "APB":
        return this.langServ.getText("offers.individuals.anualSubtitle", {
          price: offer.price
        });
      case "MPB":
        return this.langServ.getText("offers.individuals.monthlySubtitle", {
          price: offer.price
        });
    }
  }
  getOfferMonthPrice(offer: Offer): string {
    let pricePipe = new Price();
    return pricePipe.transform(offer.price / 12, {});
  }
}
