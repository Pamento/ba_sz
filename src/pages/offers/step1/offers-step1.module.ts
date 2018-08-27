import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OffersStep1Page } from './offers-step1';
import { AppCommonModule } from '../../../app/common/common.module';

@NgModule({
  declarations: [
    OffersStep1Page,
  ],
  imports: [
    IonicPageModule.forChild(OffersStep1Page),
    AppCommonModule
  ],
})
export class OffersPageModule {}
