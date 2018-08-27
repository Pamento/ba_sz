import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpPage } from './help';
import { AppCommonModule } from '../../app/common/common.module';

@NgModule({
  declarations: [
    HelpPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpPage),
    AppCommonModule
  ],
})
export class HelpPageModule {}
