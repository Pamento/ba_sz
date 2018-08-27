import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Offer } from "../../../models/offer/offer";
import { LanguageService } from "../../../providers/language/language.service";
import { OffersProvider } from "../../../providers/offers/offers";
import { OrderProvider } from "../../../providers/order/order";
import { Order } from "../../../models/order/order";
import { deepcopy } from "../../../providers/utils/utils";
import { Item } from "../../../models/item/item";
import { Observable } from "rxjs/Observable";
import { StatusService } from "../../../components/status/status.service";

/**
/**
 * Generated class for the OffersStep5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-offers-step5",
  templateUrl: "offers-step5.html"
})
export class OffersStep5Page {
  offer: Offer;
  extraOffer: Offer;
  extraProfileNumber: number;
  ocrOffer: Offer;
  order: Order;
  public form: FormGroup;
  discountCode: string = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private langServ: LanguageService,
    private offerServ: OffersProvider,
    private orderServ: OrderProvider,
    private statusServ: StatusService
  ) {
    this.offer = this.offerServ.getSelectedOffer();
    this.extraOffer = this.offerServ.getExtraOffer();
    this.extraProfileNumber = this.offerServ.extraProfileNumber;
    this.ocrOffer = this.offerServ.getOcrSelected();
    this.form = this.formBuilder.group({
      discountCode: [this.discountCode, Validators.compose([])],
      orderId: [null, Validators.compose([Validators.required])]
    });
  }
  createOrder(): Order {
    let order = new Order();
    this.setOrderAddress(order);
    this.setOrderOffer(order);
    this.setOrderExtra(order);
    this.setOrderOcr(order);
    return order;
  }
  setOrderAddress(order: Order) {
    order.address = deepcopy(this.offerServ.getInvoiceProfile().address);
    delete order.address.id;
  }
  setOrderOffer(order: Order) {
    order.lines.push(this.getOfferItem());
  }
  setItemFromOffer(
    item: Item,
    offer: Offer,
    qty: number = 1,
    calculated = false
  ) {
    item.id = offer.id;
    item.name = offer.name;
    item.qty = qty;
    item.calculated = calculated;
    item.currency = "E";
    item.currencyISO = "EUR";
    item.value = offer.value;
    item.price = offer.price;
  }
  getOfferItem(): Item {
    let item = new Item();
    this.setItemFromOffer(item, this.offer);
    return item;
  }
  setOrderExtra(order: Order) {
    if (this.offerServ.getExtraOffer() != null) {
      order.lines.push(this.getExtraItem());
    }
  }
  getExtraItem(): Item {
    let item = new Item();
    this.setItemFromOffer(item, this.extraOffer, this.extraProfileNumber, true);
    return item;
  }
  setOrderOcr(order: Order) {
    if (this.offerServ.getOcrSelected() != null) {
      order.lines.push(this.getOcrItem());
    }
  }
  getOcrItem(): Item {
    let item = new Item();
    this.setItemFromOffer(item, this.ocrOffer);
    return item;
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad OffersStep5Page");
    let newOrder = this.createOrder();
    this.orderServ.create(newOrder).subscribe(order => {
      this.order = order;
      this.form.controls['orderId'].setValue(this.order.id)
    }, (e) => {
      this.statusServ.setError(
        this.langServ.getText("offers.step5.order.create.error")
      );
    });
  }

  forwardTo(page) {
    console.log("forwardTo", page);
    this.navCtrl.push(page);
  }
  submit() {
    this.form["submit"] = true;
    if (this.form.valid) {
      let obs: Observable<any>;
      if (this.discountCode && this.discountCode.length > 0) {
        obs = new Observable<any>(o => {
          this.orderServ.applyDiscount(this.discountCode, this.order).subscribe(
            (order: Order) => {
              this.order = order;
              console.log("updated order with discount", order);
              this.statusServ.setSuccess(
                this.langServ.getText("offers.step5.discount.success")
              );
              o.next(true);
              o.complete();
            },
            error => {
              console.log("error on dicount applying", error);
              this.statusServ.setError(
                this.langServ.getText("offers.step5.discount.error")
              );
              o.next(false);
              o.complete();
            }
          );
        });
      } else {
        obs = Observable.of(true);
      }
      obs.subscribe(r => {
        this.orderServ.setCurrent(this.order);
        this.forwardTo("OffersStep6Page");
      });
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

  getFirstMonthTotal() {
    return (
      (
        (this.offer.price +
          (this.extraOffer
            ? this.extraProfileNumber * this.extraOffer.price
            : 0)
        ) / 12
        + (this.ocrOffer ? this.ocrOffer.price : 0))
    );
  }
  getMonthlyTotal() {
    return (
      (this.offer.price +
        (this.extraOffer
          ? this.extraProfileNumber * this.extraOffer.price
          : 0)
      )
      / 12
    );
  }
  getExtraMonthPrice(): number {
    return this.extraOffer && this.extraProfileNumber && ((this.extraProfileNumber * this.extraOffer.price) / 12);
  }
}
