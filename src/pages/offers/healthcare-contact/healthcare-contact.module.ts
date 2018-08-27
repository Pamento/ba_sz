import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthcareContactPage } from './healthcare-contact';
import { AppCommonModule } from '../../../app/common/common.module';

@NgModule({
  declarations: [
    HealthcareContactPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthcareContactPage),
    AppCommonModule
  ],
})
export class HealthcareContactPageModule {}
