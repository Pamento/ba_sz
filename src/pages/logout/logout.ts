import { Component } from '@angular/core';
import { ViewController, App } from 'ionic-angular';
import { AuthenticationService } from '../../providers/auth/auth.service'
import { LoginPage } from '../login/login'
/*
  Generated class for the Logout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(public viewCtrl: ViewController, private authServ: AuthenticationService, private appCtrl: App) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }
  onLogoutClick() {
    this.authServ.logout().subscribe((response) => {
      this.viewCtrl.dismiss()
      this.appCtrl.getRootNavs()[0].setRoot(LoginPage)
    })

  }
}
