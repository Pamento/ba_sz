import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import {
  TranslateService,
  MissingTranslationHandler,
  MissingTranslationHandlerParams
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Observable } from "rxjs/Observable";
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): any {
    console.error("missing lang key: " + params.key + "");
    return params.key;
  }
}
const DEFAULT_LANG = "fr";
const LANGUAGES = ["fr"];
/*
  Generated class for the Language provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LanguageService {
  private currentLanguage;
  public navigatorLanguage = navigator.language.split("-")[0];
  constructor(private translate: TranslateService) {
    console.log("Hello Language Provider");
    if (LANGUAGES.indexOf(this.navigatorLanguage) >= 0) {
      this.setCurrent(this.navigatorLanguage);
    } else {
      this.setCurrent(DEFAULT_LANG);
    }
  }

  setCurrent(value) {
    console.log("setCurrent", value);
    this.currentLanguage = value;
    this.translate.setDefaultLang(value);
    this.translate.use(value);
  }

  getCurrent(): string {
    return this.currentLanguage;
  }

  getText(key, params?) {
    if (params && params.count && params.count > 1) {
      key += ".plural";
    }
    return this.translate.instant(key, params);
  }
}
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({ name: "i18n" })
export class I18nPluralizePipe implements PipeTransform {
  // in my case: the locale will be set from outside

  constructor(private langServ: LanguageService) {}

  public transform(singularKey: string, params: string): Observable<string> {
    return this.langServ.getText(singularKey, params);
  }
}
