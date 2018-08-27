import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { OffersStep6Page } from "./offers-step6";
import { AppCommonModule } from "../../../app/common/common.module";

@NgModule({
  declarations: [OffersStep6Page],
  imports: [IonicPageModule.forChild(OffersStep6Page), AppCommonModule]
})
export class OffersStep6PageModule {}
