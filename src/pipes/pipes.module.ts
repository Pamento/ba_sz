import { NgModule } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";

import {
  Minutes,
  Hours,
  Filter,
  Capitalize,
  OrderBy,
  String,
  Time,
  Unique,
  Price,
  KeysPipe,
  SafePipe
} from "./pipes";
import { DateStringPipe } from "./date-string/date-string";
@NgModule({
  declarations: [
    DateStringPipe,
    Minutes,
    Hours,
    Filter,
    Capitalize,
    OrderBy,
    String,
    Time,
    Unique,
    Price,
    KeysPipe,
    SafePipe
  ],
  imports: [],
  exports: [
    DateStringPipe,
    Minutes,
    Hours,
    Filter,
    Capitalize,
    OrderBy,
    String,
    Time,
    Unique,
    Price,
    KeysPipe,
    SafePipe
  ]
})
export class PipesModule {}
registerLocaleData(localeFr, 'fr');
