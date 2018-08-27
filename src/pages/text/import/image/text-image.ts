import { Component, ChangeDetectorRef } from "@angular/core";
import { IonicPage, NavController, NavParams, Tabs } from "ionic-angular";
import { SubscriptionProvider } from "../../../../providers/subscription/subscription";
import { LanguageService } from "../../../../providers/language/language.service";
import { Subscription } from "../../../../models/subscription/subscription";
import { StatusService } from "../../../../components/status/status.service";
import { TextProvider } from "../../../../providers/text/text";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppValidators } from "../../../../components/validators/validators";
/**
 * Generated class for the TextImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-text-image",
  templateUrl: "text-image.html"
})
export class TextImagePage {
  selectedFile: string;
  subscription: Subscription;
  form: FormGroup;
  authorizedExtensions: string[] = [".tiff", ".png", ".jpeg", ".jpg", ".gif"];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private subscriptionServ: SubscriptionProvider,
    private langServ: LanguageService,
    private statusServ: StatusService,
    private textServ: TextProvider,
    private formBuilder: FormBuilder,
    private cRefDet: ChangeDetectorRef
  ) {
    this.subscriptionServ.getSubscription().subscribe(s => {
      this.subscription = s;
    });
    this.form = this.formBuilder.group({
      selectedFile: [
        null,
        Validators.compose([
          Validators.required,
          AppValidators.fileExtension(this.authorizedExtensions)
        ])
      ]
    });
  }

  ionViewCanEnter(): boolean {
    console.log("ionViewCanEnter", this.subscriptionServ.hasOCRRemaining());
    let authorized = this.subscriptionServ.hasOCRRemaining();
    if (!authorized) {
      this.statusServ.setError(
        this.langServ.getText("text.import.unauthorized"), this.langServ.getText("text.reloadOcr")
      ).subscribe((r) => {
        let tabs: Tabs = this.navCtrl.parent
        tabs.select(2)
        tabs.getByIndex(2).push('OffersStep1Page')
      })
    }
    return authorized;
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad TextImagePage");
  }
  upload() {
    if (this.form.valid) {
      console.log("uploading file", this.selectedFile);
      this.textServ.importFileUri(this.selectedFile).subscribe(
        r => {
          console.log("import file HTML returned", r);
          let html = r.response;
          this.statusServ.setSuccess(
            this.langServ.getText("text.import.success")
          );
          this.navCtrl.push("TextCreatePage", { html });
        },
        e => {
          console.log("import file error", e);
          this.statusServ.setError(this.langServ.getText("text.import.error"));
        }
      );
    }
  }
  isFileImported(): boolean {
    return this.selectedFile != null;
  }
  onImageTaken(fileUri: string) {
    console.log("onImageTaken", fileUri);
    this.form["submit"] = true;
    this.form.controls["selectedFile"].setValue(fileUri);
    this.selectedFile = fileUri;
    console.log("selectedFile", this.selectedFile, this.form);
    this.cRefDet.detectChanges();
  }
  getSourceTypeTexts() {
    return {
      CAMERA: this.langServ.getText("text.import.img.CAMERA"),
      PHOTOLIBRARY: this.langServ.getText("text.import.img.PHOTOLIBRARY")
    };
  }
  selectedFileName(): string {
    if (this.selectedFile) {
      let parts = this.selectedFile.split('/')
      return parts[parts.length - 1]
    } else {
      return null
    }
  }
}
