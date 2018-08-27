import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { RestService } from "../rest/rest.service";
import { Observable } from "rxjs/Observable";
import { User } from "../../models/user/user";
import { USER_REFRESHED, USER_LOGGED } from "../../app/events/events";
import { Invoice } from "../../models/invoice/invoice";
const USER_DATA = "USER_DATA";
/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
  private path: string = "users/";
  private currentUser: User = null;
  private invoices: any[] = []
  constructor(private restServ: RestService, private events: Events) {
    console.log("Hello UserService Provider");
  }
  getCurrentUser(): User {
    return this.currentUser;
  }
  getUser(options?): Observable<User> {
    return this.restServ
      .get(this.path + "account", options || { loader: false })
      .map((r: any) => {
        console.log("getUser response", r);
        if (!this.currentUser) {
          this.currentUser = new User(r);
        } else {
          this.currentUser.update(r);
        }
        return this.currentUser;
      });
  }
  loadCurrentUser(newUser?, options?): Observable<any> {
    let obs = new Observable<any>(obs => {
      if (newUser) {
        this.initUser();
      }
      this.getUser(options).subscribe(
        user => {
          console.log("got user", user, this.currentUser);
          this.events.publish(USER_REFRESHED);
          if (newUser) {
            this.events.publish(USER_LOGGED);
          }
          this.storeLocalUser(this.currentUser);
          obs.next(this.currentUser);
          obs.complete();
        },
        e => {
          console.log("could not load user", e);
          obs.error(e);
          obs.complete();
        }
      );
    });
    return obs;
  }
  initUser(data?) {
    this.currentUser = new User(data);
  }
  refreshCurrentUser(options?): Observable<any> {
    return this.loadCurrentUser(false, options);
  }
  getLocalUser() {
    let localUser = this.getLocalUserData();
    this.initUser();
    this.currentUser.update(localUser);
    this.events.publish(USER_LOGGED);
    return Observable.of(localUser);
  }
  getLocalUserData() {
    return JSON.parse(localStorage.getItem(USER_DATA));
  }
  storeLocalUser(user) {
    localStorage.setItem(USER_DATA, JSON.stringify(user));
  }
  clearUser() {
    this.currentUser = null;
    this.clearLocalUser();
  }
  clearLocalUser() {
    localStorage.removeItem(USER_DATA);
  }
  changePwd(password, newPassword, confirmPassword): Observable<any> {
    return this.restServ.post(`${this.path}password/change`, {
      password,
      newPassword,
      confirmPassword
    });
  }
  save(profile: User): Observable<User> {
    return this.restServ.post(`${this.path}account/update`, profile);
  }
  getInvoices(): Observable<Invoice[]> {
    return this.restServ
      .get(`${this.path}invoices`)
      .map(r => (this.invoices = r));
  }
  getPdfInvoice(invoice: Invoice): Observable<Blob> {
    return this.restServ
      .get(`${this.path}pdf/invoice/${invoice.id}`, { responseType: "blob" })
  }

}
