import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPwdPage } from './reset-pwd';
import { AppCommonModule } from '../../app/common/common.module'
@NgModule({
  declarations: [
    ResetPwdPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPwdPage),
    AppCommonModule
  ],
})
export class ResetPwdPageModule {}
