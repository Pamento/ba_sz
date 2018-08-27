import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextReadPage } from './text-read';

@NgModule({
  declarations: [
    TextReadPage,
  ],
  imports: [
    IonicPageModule.forChild(TextReadPage),
  ],
})
export class TextReadPageModule {}
