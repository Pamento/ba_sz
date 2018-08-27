import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextImagePage } from './text-image';
import { AppCommonModule } from '../../../../app/common/common.module';

@NgModule({
  declarations: [
    TextImagePage,
  ],
  imports: [
    IonicPageModule.forChild(TextImagePage),AppCommonModule
  ],
})
export class TextImagePageModule {}
