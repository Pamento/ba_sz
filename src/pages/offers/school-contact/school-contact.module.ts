import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolContactPage } from './school-contact';
import { AppCommonModule } from '../../../app/common/common.module';

@NgModule({
  declarations: [
    SchoolContactPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolContactPage),
    AppCommonModule
  ],
})
export class SchoolContactPageModule {}
