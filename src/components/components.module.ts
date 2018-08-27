import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";

import { StatusComponent } from "./status/status";
import { FontStylePickerComponent } from "./font-style-picker/font-style-picker";
import { ColorPickerComponent } from "./color-picker/color-picker";
import { ColorPickerSelectorComponent } from "./color-picker/selector/color-picker-selector";
import { FontSizePickerComponent } from "./font-size-picker/font-size-picker";
import { ImageUploader } from "./image-uploader/image-uploader";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
@NgModule({
  declarations: [
    StatusComponent,
    FontStylePickerComponent,
    ColorPickerComponent,
    ColorPickerSelectorComponent,
    FontSizePickerComponent,
    ImageUploader
  ],
  entryComponents: [ColorPickerSelectorComponent],
  providers: [File, FileOpener],
  imports: [CommonModule, IonicModule],
  exports: [
    StatusComponent,
    FontStylePickerComponent,
    ColorPickerComponent,
    FontSizePickerComponent,
    ImageUploader
  ]
})
export class ComponentsModule { }
