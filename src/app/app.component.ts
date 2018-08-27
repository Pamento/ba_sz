import { Component } from "@angular/core";
import {
  Platform,
  Events,
  LoadingController,
  App,
  Loading,
  ModalController
} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/observable/of";

import { AuthenticationService } from "../providers/auth/auth.service";
import { LanguageService } from "../providers/language/language.service";
import { PlatformService } from "../providers/platform/platform";

import {
  USER_LOGGED,
  APP_REQUEST_TIMEOUT,
  NETWORK_ERROR,
  APP_REQUEST_LOADING,
  APP_REQUEST_LOADED
} from "./events/events";
import { StatusService } from "../components/status/status.service";
import { SubscriptionProvider } from "../providers/subscription/subscription";
declare let cordova;
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage;
  rootNav;

  private loader: Loading;
  constructor(
    private platform: Platform,
    private authServ: AuthenticationService,
    private langServ: LanguageService,
    private events: Events,
    private statusServ: StatusService,
    private loadCtrl: LoadingController,
    private platformServ: PlatformService,
    private app: App,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private subscriptionServ: SubscriptionProvider,
    private modalCtrl: ModalController
  ) {
    this.subscribeEvents();
    this.platform.ready().then(() => {
      window.open = cordova.InAppBrowser.open;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log("app component: platform is ready");
      this.platformServ.start();
      this.setRootPage().subscribe(page => {
        this.rootPage = page;
      });
      this.rootNav = this.app.getRootNavs()[0];
      /*infinite loader*/
      /*this.showLoader()*/
    });
  }
  showLoader() {
    this.loader = this.loadCtrl.create({
      spinner: "dots",
      content: "Traitement en cours."
    });
    this.loader.present();
  }
  hideLoader() {
    this.loader.dismiss();
  }
  setRootPage(): Observable<any> {
    return new Observable<any>(obs => {
      this.authServ.autoLog().subscribe(
        u => {
          console.log("autologgued");
          obs.next("TabsPage");
          obs.complete();
        },
        e => {
          console.log("not autologgued");
          obs.next("LoginPage");
          this.showOnBoarding()
          obs.complete();
        }
      );
    });
  }

  subscribeEvents() {
    this.events.subscribe(USER_LOGGED, user => {
      this.userLogged();
    });
    this.events.subscribe(APP_REQUEST_TIMEOUT, () => {
      this.displayErrorStatus(APP_REQUEST_TIMEOUT);
    });
    this.events.subscribe(NETWORK_ERROR, error => {
      this.displayErrorStatus(NETWORK_ERROR, error);
    });
    this.events.subscribe(APP_REQUEST_LOADING, () => {
      this.showLoader();
    });
    this.events.subscribe(APP_REQUEST_LOADED, () => {
      this.hideLoader();
    });
  }
  userLogged() {
    this.subscriptionServ.getSubscription().subscribe();
  }
  showOnBoarding() {
    //launch onBoarding modal on login page loaded
    this.modalCtrl.create('OnBoardingPage', null, { cssClass: 'fullscreen-modal' }).present();
  }

  displayErrorStatus(type: string, error = null) {
    this.statusServ.setError(this.getErrorMessage(type, error));
  }
  getErrorMessage(type: string, error: any = null) {
    switch (type) {
      case APP_REQUEST_TIMEOUT:
        return this.langServ.getText("request.error.timeout");
      case NETWORK_ERROR:
        switch (error.status) {
          case 400:
            return this.langServ.getText("request.error.validation");
          case 500:
            return this.langServ.getText("request.error.internal_server_error");
        }
    }
  }
}
