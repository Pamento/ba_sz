import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TextCreatePage } from "./text-create";
import { AppCommonModule } from "../../../app/common/common.module";
import { ReadingProfileSelectorComponent } from "../reading-profile-selector/reading-profile-selector";
import { CKEditorModule } from "ngx-ckeditor";
import { TextSaverComponent } from "../saver/text-saver";
import { TextEditorComponent } from "../editor/text-editor";
import { TextVoicerComponent } from "../voicer/text-voicer";

@NgModule({
  declarations: [
    TextCreatePage,
    ReadingProfileSelectorComponent,
    TextSaverComponent,
    TextEditorComponent,
    TextVoicerComponent
  ],
  imports: [
    IonicPageModule.forChild(TextCreatePage),
    CKEditorModule,
    AppCommonModule
  ],
  exports: [
    TextSaverComponent,
    TextEditorComponent,
    ReadingProfileSelectorComponent,
    TextVoicerComponent
  ]
})
export class TextCreatePageModule { }
