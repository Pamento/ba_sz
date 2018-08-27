import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogoutPage } from './logout';
import { AppCommonModule } from '../../app/common/common.module'
@NgModule({
  declarations: [
    LogoutPage,
  ],
  imports: [
    IonicPageModule.forChild(LogoutPage),
    AppCommonModule
  ],
})
export class LogoutPageModule {}
