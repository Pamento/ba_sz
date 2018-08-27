import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextPage } from './text';
import { AppCommonModule } from '../../app/common/common.module';

@NgModule({
  declarations: [
    TextPage,
  ],
  imports: [
    IonicPageModule.forChild(TextPage),AppCommonModule
  ],
})
export class TextPageModule {}
