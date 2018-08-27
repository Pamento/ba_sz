import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdultItemPage } from './adult-item';
import { AppCommonModule } from '../../../../app/common/common.module';

@NgModule({
  declarations: [
    AdultItemPage,
  ],
  imports: [
    IonicPageModule.forChild(AdultItemPage),
    AppCommonModule
  ],
})
export class UserItemPageModule {}
