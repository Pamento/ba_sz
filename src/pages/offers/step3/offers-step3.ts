import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OffersProvider } from '../../../providers/offers/offers';
import { Offer } from '../../../models/offer/offer';
import { LanguageService } from '../../../providers/language/language.service';
import { CustomValidators } from 'ng2-validation';
/**
 * Generated class for the OffersStep3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offers-step3',
  templateUrl: 'offers-step3.html',
})
export class OffersStep3Page {
  public form: FormGroup;
  ocrList : Offer[];
  ocr:number=null
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private offerServ: OffersProvider,
    private langServ:LanguageService
  ) {
    this.form = this.formBuilder.group({
      ocr: [
        null,
        Validators.compose([Validators.required,CustomValidators.min(0)])
      ]
    });
    this.offerServ.getOCRList().subscribe((ocrList)=>{
      this.ocrList = ocrList
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OffersStep3Page');
  }
  forwardTo(page) {
    console.log("forwardTo", page);
    this.navCtrl.push(page);
  }
  submit(){
    this.form["submit"] = true
    if (this.form.valid){
      let ocr = this.ocrList.find((o=>o.id==this.ocr));
      this.offerServ.setOcrSelected(ocr)
      this.forwardTo('OffersStep4Page')  
    }
  }
  getOcrHtml(ocr:Offer):string {
    switch (ocr.value){
      case "OCR50":
        return this.langServ.getText("offers.step3.OCRRadio1")
      case "OCR250":
        return this.langServ.getText("offers.step3.OCRRadio2")
      case "OCR500":
        return this.langServ.getText("offers.step3.OCRRadio3")
      case "OCR1000":
        return this.langServ.getText("offers.step3.OCRRadio4")
      case "OCR2000":
        return this.langServ.getText("offers.step3.OCRRadio5")
      case "OCR3000":
        return this.langServ.getText("offers.step3.OCRRadio6")
    }
  }

}
