import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffersStep4Page } from './offers-step4';
import { AppCommonModule } from '../../../app/common/common.module';

@NgModule({
  declarations: [
    OffersStep4Page,
  ],
  imports: [
    IonicPageModule.forChild(OffersStep4Page),
    AppCommonModule
  ],
})
export class OffersStep4PageModule {}
