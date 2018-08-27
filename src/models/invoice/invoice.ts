import { Address } from "../address/address";

export class Invoice {
    address:Address
    date:string
    description:string
    docStatus:string
    docStatusName:string
    documentNo:string
    grandTotal:number
    id:number
    lines:any[]
    name:string
    poReference:string
    subscription:boolean
    totalLines:number
}