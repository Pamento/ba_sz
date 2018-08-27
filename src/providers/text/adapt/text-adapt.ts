import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  ReadingProfile,
} from "../../../models/reading-profile/reading-profile";
import { fromPromise } from "rxjs/observable/fromPromise";
declare var adaptWebPage;
/*
  Generated class for the TextAdaptProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TextAdaptProvider {
  constructor(public http: HttpClient) {
    console.log("Hello TextAdaptProvider Provider");
  }
  adapt(text: string, profile: ReadingProfile): Observable<string> {
    return fromPromise(adaptWebPage(text, profile));
  }
}
