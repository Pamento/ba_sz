import { Address } from '../address/address';
import {DocumentItem } from '../documentItem/documentItem';
import {Payment } from '../payment/payment';
import {Item } from '../item/item';

export class Order {
  id : number;
  documentNo : string;
  poReference : string;
  description : string;
  docStatus : string;
  docStatusName: string;
  date : string;
  totalLines : number;
  grandTotal : number;
  name : string;
  address : Address;
  payments:Payment[];
  invoices:DocumentItem;
  lines:Item[]=[];
  discount:number;
  isSubscription:boolean;
}
