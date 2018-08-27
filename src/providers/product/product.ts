import { Injectable } from "@angular/core";
import { RestService } from "../rest/rest.service";
import { Observable } from "rxjs/Observable";
import { Product } from "../../models/product/product";

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {
  private path = "common";
  constructor(public restServ: RestService) {
    console.log("Hello ProductProvider Provider");
  }
  getByValue(value: string) : Observable<Product> {
    return this.restServ.get(`${this.path}/product/${value}`);
  }
}
