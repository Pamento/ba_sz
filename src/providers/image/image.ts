import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
const ICON_IMG_SERVER_PATH = 'images/app/'
const ICON_IMG_ROOT_PATH = 'www/assets/img/icons/'

/*
  Generated class for the Image provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ImageService {
  private rootUrl: string;
  constructor(public http: HttpClient) {
    console.log('Hello Image Provider');
  }

  getRootUrl() {
    return this.rootUrl
  }

  setRootUrl(url: string) {
    this.rootUrl = url
  }

  getFullUrl(path: string) {
    return this.rootUrl + path
  }

  isDefault(path) {
    return (!path || path == "default" || path == "url" || path == "mockup")
  }
  getIconImgRootUrl(): string {
    return this.getRootUrl() + ICON_IMG_SERVER_PATH
  }
  getIconImgRootPath(): string {
    return ICON_IMG_ROOT_PATH
  }
  getIconImg(icon: string, local = true): string {
    let fn = local ? 'getIconImgRootPath' : 'getIconImgRootUrl'
    return this[fn]() + icon + '.png'
  }

}
