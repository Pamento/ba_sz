import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import { AppCommonModule } from '../../app/common/common.module';

@NgModule({
  declarations: [
    AccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPage),AppCommonModule
  ],
})
export class AccountPageModule {}
