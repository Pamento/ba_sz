import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SubscriptionProvider } from "../../providers/subscription/subscription";
import { Subscription } from "../../models/subscription/subscription";
import { ReadingProfileProvider } from "../../providers/reading-profile/reading-profile";
import { ReadingProfile } from "../../models/reading-profile/reading-profile";
import { Product } from "../../models/product/product";
import { ProductProvider } from "../../providers/product/product";
import { Child } from "../../models/user/child";
import { Adult } from "../../models/user/adult";

/**
 * Generated class for the SolutionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-solutions",
  templateUrl: "solutions.html"
})
export class SolutionsPage {
  subscription: Subscription;
  children: Child[];
  users: Adult[];
  product: Product;
  readingProfiles: ReadingProfile[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private subscriptionServ: SubscriptionProvider,
    private readingProfileServ: ReadingProfileProvider,
    private productServ: ProductProvider
  ) {
    this.subscriptionServ.getSubscription().subscribe(s => {
      this.subscription = s;
      this.productServ
        .getByValue(this.subscription.productValue)
        .subscribe(p => {
          this.product = p;
        });
    });
    this.subscriptionServ.getChildrenList().subscribe(list => {
      this.children = list;
    });
    this.subscriptionServ.getUserList().subscribe(list => {
      this.users = list;
    });
    this.readingProfileServ.getList().subscribe(list => {
      this.readingProfiles = list;
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SolutionsPage");
  }
}
