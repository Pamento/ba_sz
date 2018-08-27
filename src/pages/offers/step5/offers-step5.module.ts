import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffersStep5Page } from './offers-step5';
import { AppCommonModule } from '../../../app/common/common.module';

@NgModule({
  declarations: [
    OffersStep5Page,
  ],
  imports: [
    IonicPageModule.forChild(OffersStep5Page),
    AppCommonModule
  ],
})
export class OffersStep5PageModule {}
