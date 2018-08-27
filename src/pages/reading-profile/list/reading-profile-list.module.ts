import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadingProfileListPage } from './reading-profile-list';
import { AppCommonModule } from '../../../app/common/common.module';

@NgModule({
  declarations: [
    ReadingProfileListPage,
  ],
  imports: [
    IonicPageModule.forChild(ReadingProfileListPage),
    AppCommonModule
  ],
})
export class ReadingProfileListPageModule {}
