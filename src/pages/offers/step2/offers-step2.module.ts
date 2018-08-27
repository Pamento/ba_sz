import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffersStep2Page } from './offers-step2';
import { AppCommonModule } from '../../../app/common/common.module';

@NgModule({
  declarations: [
    OffersStep2Page,
  ],
  imports: [
    IonicPageModule.forChild(OffersStep2Page),
    AppCommonModule
  ],
})
export class OffersStep2PageModule {}
