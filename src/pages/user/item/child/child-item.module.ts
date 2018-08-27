import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildItemPage } from './child-item';
import { AppCommonModule } from '../../../../app/common/common.module';

@NgModule({
  declarations: [
    ChildItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildItemPage),
    AppCommonModule
  ],
})
export class UserItemPageModule {}
