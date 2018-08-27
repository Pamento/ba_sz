import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";

import { RestService } from "../rest/rest.service";

/*
  Generated class for the ProfileService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileService {
  private path: string = "profile";

  constructor(private restServ: RestService) {
    console.log("Hello Profile Provider");
  }
  update(profile): Observable<Response> {
    return this.restServ.post(this.path, profile);
  }
}
