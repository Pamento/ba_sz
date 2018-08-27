import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicesPage } from './invoices';
import { AppCommonModule } from '../../app/common/common.module';

@NgModule({
  declarations: [
    InvoicesPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoicesPage),
    AppCommonModule
  ],
})
export class InvoicesPageModule {}
