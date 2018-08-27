import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextImportPage } from './text-import';
import { AppCommonModule } from '../../../app/common/common.module';

@NgModule({
  declarations: [
    TextImportPage,
  ],
  imports: [
    IonicPageModule.forChild(TextImportPage),AppCommonModule
  ]
})
export class TextImportPageModule {}
