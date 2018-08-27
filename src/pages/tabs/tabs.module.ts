import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { AppCommonModule } from '../../app/common/common.module';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    AppCommonModule
  ],
})
export class TabsPageModule {}
