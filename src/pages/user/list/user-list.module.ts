import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserListPage } from './user-list';
import { AppCommonModule } from '../../../app/common/common.module';

@NgModule({
  declarations: [
    UserListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserListPage),
    AppCommonModule
  ],
})
export class UserListPageModule {}
