import { Component, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PaymentProvider } from "../../../providers/payment/payment";
import { OrderProvider } from "../../../providers/order/order";
import { Order } from "models/order/order";

/* Generated class for the OffersStep6Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-offers-step6",
  templateUrl: "offers-step6.html"
})
export class OffersStep6Page {
  systemPayUrl = "https://paiement.systempay.fr/vads-payment/"
  order: Order;
  @ViewChild("form") form: ElementRef;
  @ViewChild("iframe") iframe: ElementRef;
  private listenIframeLoadEvent: boolean = false
  private processingPayment: boolean = true
  paymentInfo = {
    vads_ctx_mode: null,
    vads_url_return: null,
    vads_action_mode: null,
    cmd: null,
    signature: null,
    vads_amount: null,
    vads_contrib: null,
    vads_currency: null,
    vads_cust_email: null,
    vads_cust_id: null,
    vads_cust_name: null,
    vads_order_id: null,
    vads_page_action: null,
    vads_payment_config: null,
    vads_site_id: null,
    vads_trans_date: null,
    vads_trans_id: null,
    vads_version: null
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderServ: OrderProvider,
    private paymentServ: PaymentProvider,
    private cDetRef: ChangeDetectorRef
  ) {
    this.order = this.orderServ.getCurrent();
    console.log("order", this.order);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OffersStep6Page");
    this.paymentServ.getPaymentInfo(this.order, "S").subscribe(paymentInfos => {
      paymentInfos.forEach(paymentInfo => {
        if (this.paymentInfo[paymentInfo.name]) {
          //force values
          return;
        }
        this.paymentInfo[paymentInfo.name] = paymentInfo.value;
        console.log("key val added", paymentInfo);
      });
      console.log("paymentInfo", this.paymentInfo);
      this.cDetRef.detectChanges()
      this.form.nativeElement.submit();
    });
  }
  onIframeUrlChange() {
    console.log('onIframeUrlChange', this.getiFrameUrl());
    if (!this.listenIframeLoadEvent) {
      this.listenIframeLoadEvent = true
      return
    }
    else if (this.isCallbackUrl(this.getiFrameUrl())) {
      this.processingPayment = false
      this.navCtrl.popToRoot()
    }
  }
  getiFrameUrl(): string {
    return this.iframe && this.iframe.nativeElement && this.iframe.nativeElement.contentWindow.location.href
  }
  isProcessingPayment(): boolean {
    return this.processingPayment
  }
  getPaymentUrl(): string {
    return this.systemPayUrl
  }
  isCallbackUrl(url: string): boolean {
    return url.indexOf(this.paymentInfo.vads_url_return) >= 0 || url.indexOf('data:') >= 0
  }
}
