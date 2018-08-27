import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnBoardingPage } from './on-boarding';
import { AppCommonModule } from '../../app/common/common.module'

@NgModule({
  declarations: [
    OnBoardingPage,
  ],
  imports: [
    IonicPageModule.forChild(OnBoardingPage),
    AppCommonModule
  ],
})
export class OnBoardingPageModule {}
