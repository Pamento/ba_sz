import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInPage } from './sign-in';
import { AppCommonModule } from '../../app/common/common.module'

@NgModule({
  declarations: [
    SignInPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInPage),
    AppCommonModule
  ],
})
export class SignInPageModule { }
