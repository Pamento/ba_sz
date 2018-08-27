import { Role } from '../roles/role';

export class Subscription {
    subscriptionId:number
    subscriptionUserId:number
    name:string
    productValue:string
    startDate:string
    paidUntilDate:string
    counter:number
    counterUser: number
    counterProfile:number
    counterChild:number
    profileId:number
    globalCounter:number
    authorities:Role[]
    owner:boolean
    accessAdmin:boolean
    child:boolean
    viewAccount:boolean
    viewProfile: boolean   
}