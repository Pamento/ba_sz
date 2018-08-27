import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolutionsPage } from './solutions';
import { AppCommonModule } from '../../app/common/common.module';

@NgModule({
  declarations: [
    SolutionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SolutionsPage),
    AppCommonModule
  ],
})
export class SolutionsPageModule {}
