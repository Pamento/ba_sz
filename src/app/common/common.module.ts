import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { I18nPluralizePipe } from "../../providers/language/language.service";
import { StatusService } from "../../components/status/status.service";
import { FileManagerService } from "../../components/file-manager/file-manager";

import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [I18nPluralizePipe],
  exports: [I18nPluralizePipe, ComponentsModule, PipesModule],
  providers: [StatusService, FileManagerService],
  imports: [ComponentsModule, CommonModule, PipesModule]
})
export class AppCommonModule { }
