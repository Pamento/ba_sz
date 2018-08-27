import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { AppCommonModule } from '../../app/common/common.module'
@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    AppCommonModule
  ],
})
export class LoginPageModule {}
