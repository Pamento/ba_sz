import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TextEditorModalPage } from "./text-editor-modal";
import { AppCommonModule } from "../../../../app/common/common.module";

@NgModule({
  declarations: [
    TextEditorModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TextEditorModalPage),
    AppCommonModule
  ],
  exports: [
  ]
})
export class TextEditorModalModule { }
