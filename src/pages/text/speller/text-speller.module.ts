import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TextSpellerPage } from "./text-speller";
import { AppCommonModule } from "../../../app/common/common.module";
import { CKEditorModule } from "ngx-ckeditor";
import { TextCreatePageModule } from "../create/text-create.module";

@NgModule({
  declarations: [TextSpellerPage],
  imports: [
    IonicPageModule.forChild(TextSpellerPage),
    CKEditorModule,
    AppCommonModule,
    TextCreatePageModule
  ]
})
export class TextSpellerPageModule {}
