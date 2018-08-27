import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../rest/rest.service';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {
  path:string = 'common/'
  constructor(
    private restService:  RestService
  ){

  }
  getList(): Observable<Response> {
    return this.restService.get(this.path + "groups");
  }

}
