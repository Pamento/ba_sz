import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { RestService } from "../rest/rest.service";
import { Offer } from "../../models/offer/offer";
import { User } from "../../models/user/user";

/*
  Generated class for the CountryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OffersProvider {
  selectedOffer: Offer;
  extraOffer: Offer;
  extraProfileNumber: number;
  ocr: Offer;
  invoiceProfile: User;
  path: string = "common/product/";
  constructor(private restService: RestService) {}
  getList(): Observable<Offer[]> {
    return Observable.forkJoin(this.getAnnual(), this.getMonthly());
  }
  getAnnual(): Observable<Offer> {
    return this.restService.get(`${this.path}APB`);
  }
  getMonthly(): Observable<Offer> {
    return this.restService.get(`${this.path}MPB`);
  }
  getAnualExtra(): Observable<Offer> {
    return this.restService.get(`${this.path}APS`);
  }
  getMonthlyExtra(): Observable<Offer> {
    return this.restService.get(`${this.path}MPS`);
  }
  getOCRList(): Observable<Offer[]> {
    return Observable.forkJoin(
      this.restService.get(`${this.path}OCR50`) as Observable<Offer>,
      this.restService.get(`${this.path}OCR250`) as Observable<Offer>,
      this.restService.get(`${this.path}OCR500`) as Observable<Offer>,
      this.restService.get(`${this.path}OCR1000`) as Observable<Offer>,
      this.restService.get(`${this.path}OCR2000`) as Observable<Offer>,
      this.restService.get(`${this.path}OCR3000`) as Observable<Offer>
    );
  }
  setSelectedOffer(offer: Offer) {
    this.selectedOffer = offer;
  }
  getSelectedOffer(): Offer {
    return this.selectedOffer;
  }
  setExtraProfileNumberSelected(extraProfileNb: number) {
    this.extraProfileNumber = extraProfileNb;
  }
  getExtraProfileNumberSelected(): number {
    return this.extraProfileNumber;
  }
  getExtraOffer(): Offer {
    return this.extraOffer;
  }
  setExtraOffer(offer: Offer) {
    this.extraOffer = offer;
  }
  getOcrSelected(): Offer {
    return this.ocr;
  }
  setOcrSelected(offer: Offer) {
    this.ocr = offer;
  }
  getInvoiceProfile(): User {
    return this.invoiceProfile;
  }
  setInvoiceProfile(profile: User) {
    this.invoiceProfile = profile;
  }
}
