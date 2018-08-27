import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FolderEditPage } from './folder-edit';
import { AppCommonModule } from '../../../app/common/common.module'

@NgModule({
  declarations: [
    FolderEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FolderEditPage),
    AppCommonModule
  ],
})
export class FolderEditPageModule {}
