import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
const android="android"
const ios="ios"

/*
  Generated class for the Platform provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PlatformService {
    platformName: string;
    platformLang: string;
    constructor(
        private platform: Platform

    ) {
        console.log('Hello PlatformService Provider');
    }

    start() {
        this.platformName = this.getPlatformName();
        this.platformLang = this.platform.lang();
        console.log('platformName:' + this.platformName);
        console.log('platformLang:' + this.platformLang);

    }
    getPlatformName(): string {
        if (this.platform.is(android)) {
            return android
        } else if (this.platform.is(ios)) {
            return ios
        }
    }
    isAndroid():boolean {
        return this.getPlatformName()==android
    }
    isiOS():boolean {
        return this.getPlatformName()==ios
    }

}
