import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadingProfileItemPage } from './reading-profile-item';
import { AppCommonModule } from '../../../app/common/common.module'
@NgModule({
  declarations: [
    ReadingProfileItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadingProfileItemPage),
    AppCommonModule
  ],
})
export class ReadingProfileItemPageModule {}
