import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { AppCommonModule } from '../../app/common/common.module';
@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    AppCommonModule
  ],
})
export class ProfilePageModule {}
