import { Injectable } from "@angular/core";
import { RestService } from "../rest/rest.service";
import { Observable } from "rxjs/Observable";
import { Order } from "../../models/order/order";
/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentProvider {
  private path = "checkout/";
  constructor(public restServ: RestService) {
    console.log("Hello PaymentProvider Provider");
  }
  pay(order: Order, type: string): Observable<Order> {
    return this.restServ.put(`${this.path}payment/${type}/${order.id}`, order);
  }
  getPaymentInfo(
    order: Order,
    type: "S" | "P"
  ): Observable<[{ name: string; value: string }]> {
    return this.restServ.get(`${this.path}paymentinfo/${type}/${order.id}`);
  }
}
