import { Injectable } from "@angular/core";
import { RestService } from "../rest/rest.service";
import { Observable } from "rxjs/Observable";
import { Order } from "../../models/order/order";
import { Address } from "../../models/address/address";
/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {
  order: Order;
  private path = "checkout/";
  constructor(public restServ: RestService) {
    console.log("Hello OrderProvider Provider");
  }
  create(order: Order): Observable<Order> {
    return this.restServ.post(`${this.path}order/create`, order);
  }
  applyDiscount(code: string, order: Order): Observable<Order> {
    return this.restServ.put(`${this.path}discount/${order.id}/${code}`, {
      code
    });
  }
  getAddress(): Observable<Address> {
    return this.restServ.get(`${this.path}address`);
  }
  setCurrent(order: Order) {
    this.order = order;
  }
  getCurrent(): Order {
    return this.order;
  }
}
