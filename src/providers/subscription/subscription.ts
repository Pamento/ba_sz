import { Injectable } from "@angular/core";
import { RestService } from "../rest/rest.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "../../models/subscription/subscription";
import { User } from "../../models/user/user";
import { ReadingProfileProvider } from "../reading-profile/reading-profile";
import { Child } from "../../models/user/child";
import { Adult } from "../../models/user/adult";
import { DateService } from "../date/date";

/*
  Generated class for the SubscriptionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubscriptionProvider {
  private path: string = "subscription";
  private subscription: Subscription;
  private users: User[];
  private children: User[];
  constructor(
    private restServ: RestService,
    private readingProfileServ: ReadingProfileProvider,
    private dateServ: DateService
  ) {
    console.log("Hello SubscriptionProvider");
  }
  getCurrent(): Subscription {
    return this.subscription
  }
  getSubscription(): Observable<Subscription> {
    return this.restServ.get(this.path).map(r => (this.subscription = r));
  }
  getUserList(): Observable<Adult[]> {
    return this.restServ
      .get(`${this.path}/list/users/${this.subscription.subscriptionId}`)
      .map(r => (this.users = r));
  }
  getChildrenList(): Observable<Child[]> {
    return this.restServ
      .get(`${this.path}/list/children/${this.subscription.subscriptionId}`)
      .map(r => (this.children = r));
  }
  hasProfileRemaining(): boolean {
    console.log(
      "hasProfileRemaining",
      this.subscription.counterProfile,
      this.readingProfileServ.countProfiles()
    );
    return (
      this.readingProfileServ.countProfiles() <
      this.subscription.counterProfile && this.hasOfferPending()
    );
  }
  hasOCRRemaining(): boolean {
    return this.subscription.counter > 0;
  }
  hasOfferPending(): boolean {
    console.log("hasOfferPending", this.subscription);
    return (
      this.subscription &&
      this.subscription.subscriptionId != null &&
      this.dateServ
        .moment(this.subscription.paidUntilDate)
        .isAfter(this.dateServ.today())
    );
  }
  hasPayingOfferPending(): boolean {
    return (
      this.hasOfferPending() &&
      this.subscription.productValue != "SUBSCRIPTION_FREE"
    );
  }
  addChild(child: Child): Observable<Child> {
    return this.restServ.post(`${this.path}/add/child/`, child);
  }
  updateChild(child: Child): Observable<Child> {
    return this.restServ.post(`${this.path}/update/child/`, child);
  }
  saveChild(child: Child): Observable<Child> {
    return child.id != null ? this.updateChild(child) : this.addChild(child);
  }
  addAdult(adult: Adult): Observable<Adult> {
    return this.restServ.post(`${this.path}/add/user/`, adult);
  }
  updateAdult(adult: Adult): Observable<Adult> {
    return this.restServ.post(`${this.path}/update/user/`, adult);
  }
  saveAdult(adult: Adult): Observable<Adult> {
    return adult.id != null ? this.updateAdult(adult) : this.addAdult(adult);
  }
  deleteUser(user: Adult | Child): Observable<any> {
    return this.restServ.delete(`${this.path}/user/delete/${user.id}`);
  }
  clear() {
    this.subscription = null;
  }
}
