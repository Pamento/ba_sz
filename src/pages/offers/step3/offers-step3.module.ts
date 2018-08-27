import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffersStep3Page } from './offers-step3';
import { AppCommonModule } from '../../../app/common/common.module';

@NgModule({
  declarations: [
    OffersStep3Page,
  ],
  imports: [
    IonicPageModule.forChild(OffersStep3Page),
    AppCommonModule
  ],
})
export class OffersStep3PageModule {}
