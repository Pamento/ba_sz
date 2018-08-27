import { Injectable } from "@angular/core";
import { RestService } from "../rest/rest.service";
import { UserService } from "../user/user.service";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";
import { Events } from "ionic-angular";

import { USER_LOGGED } from "../../app/events/events";
import { isConnected } from "../utils/utils";
import { User } from "../../models/user/user";
import { RoleProvider } from "../role/role";
import { SubscriptionProvider } from "../subscription/subscription";

const AUTH_TOKEN = "AUTH_TOKEN";
export const IS_USER_LOGGED_IN = "IS_USER_LOGGED_IN";
export const INFO_PAGE_DISPLAYED = "INFO_PAGE_DISPLAYED";

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthenticationService {
  private path: string = "";
  private token: string;

  constructor(
    private restService: RestService,
    private roleServ: RoleProvider,
    private userServ: UserService,
    private subscriptionServ: SubscriptionProvider,
    private events: Events
  ) {
    this.events.subscribe(IS_USER_LOGGED_IN, data => {
      this.hasLoggedIn(data);
    });
  }
  ngOnDestroy() {
    this.events.unsubscribe(IS_USER_LOGGED_IN);
  }

  login(username: string, password: string): Observable<Response> {
    console.log("login");
    return this.restService.post(this.path + "login", { username, password });
  }
  signIn(user: User): Observable<Response> {
    console.log("signIn", user);
    return this.restService.post(this.path + "users/signup", user);
  }

  autoLog(): Observable<any> {
    let authToken = this.retrieveStoredToken();
    console.log("autoLog");
    console.log("authToken", authToken);

    if (authToken) {
      //is autologged
      if (!isConnected()) {
        return this.userServ.getLocalUser();
      } else {
        return this.userServ.loadCurrentUser(true);
      }
    } else {
      return new Observable<any>(obs => obs.error("notAutoLogged"));
    }
  }
  setToken(token, store?) {
    this.token = token;
    this.restService.setAuthToken(token);
    if (store) {
      this.storeToken();
    }
  }
  getToken(): string {
    return this.token;
  }
  storeToken() {
    localStorage.setItem(AUTH_TOKEN, this.token);
  }
  retrieveStoredToken(): string {
    let token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      this.setToken(token);
    }
    return token;
  }
  clearData() {
    this.clearToken();
    this.clearUserData();
    this.clearInfoPageDisplay();
  }
  clearUserData() {
    this.userServ.clearUser();
    this.subscriptionServ.clear()
  }
  clearToken() {
    this.token = null;
    localStorage.removeItem(AUTH_TOKEN);
  }
  clearInfoPageDisplay() {
    localStorage.removeItem(INFO_PAGE_DISPLAYED);
  }

  hasLoggedIn(data) {
    console.log("user logged in", data);
    this.setToken(data.token, true);
    //get user data
    this.userServ.loadCurrentUser().subscribe(data => {
      this.events.publish(USER_LOGGED);
    });
    this.roleServ.setRoles(data.roles);
  }
  logout(): Observable<boolean> {
    console.log("user logging out");
    try {
      this.clearData();
      return Observable.of(true);
    } catch (e) {
      return Observable.of(false);
    }
  }
  isEmailAvailable(email: string): Observable<any> {
    return this.restService.post("common/lookup/email", JSON.stringify(email), {
      loader: false,
      "Content-Type": "application/json",
      responseType: "json"
    });
  }
}
