import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyContactPage } from './company-contact';
import { AppCommonModule } from '../../../app/common/common.module';


@NgModule({
  declarations: [
    CompanyContactPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyContactPage),
    AppCommonModule
  ],
})
export class CompanyContactPageModule {}
