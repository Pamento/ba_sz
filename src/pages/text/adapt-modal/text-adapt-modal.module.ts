import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextAdaptModalPage } from './text-adapt-modal';
import { AppCommonModule } from "../../../app/common/common.module";

@NgModule({
  declarations: [
    TextAdaptModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TextAdaptModalPage),AppCommonModule
  ],
})
export class TextAdaptModalPageModule {}
