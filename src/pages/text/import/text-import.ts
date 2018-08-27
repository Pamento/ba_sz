import { Component, ViewChild, ElementRef, ChangeDetectorRef } from "@angular/core";
import { IonicPage, NavController, NavParams, Tabs } from "ionic-angular";
import { SubscriptionProvider } from "../../../providers/subscription/subscription";
import { LanguageService } from "../../../providers/language/language.service";
import { Subscription } from "../../../models/subscription/subscription";
import { StatusService } from "../../../components/status/status.service";
import { TextProvider } from "../../../providers/text/text";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppValidators } from "../../../components/validators/validators";
import { PlatformService } from "../../../providers/platform/platform";
import { FileChooser } from '@ionic-native/file-chooser';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { File, FileEntry, IFile } from '@ionic-native/file'
import { FilePath } from '@ionic-native/file-path';
import { Observable } from "rxjs/Observable";
/**
 * Generated class for the TextImportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-text-import",
  templateUrl: "text-import.html"
})
export class TextImportPage {
  @ViewChild("fileInput") fileInput: ElementRef;
  hasOCRRemaining: boolean;
  selectedFileUri: string;
  subscription: Subscription;
  form: FormGroup;
  authorizedExtensions: string[]
  authorizedMimes: string[]
  textExtensions: string[] = [
    ".odt",
    ".doc",
    ".docx",
  ];
  ocrExtensions: string[] = [
    ".pdf",
    ".tiff",
    ".png",
    ".jpeg",
    ".jpg",
    ".gif"
  ]
  textMimes: string[] = [
    "application/vnd.oasis.opendocument.text",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  ocrMimes: string[] = [
    "application/pdf",
    "image/tiff",
    "image/png",
    "image/jpeg",
    "image/gif"
  ]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private subscriptionServ: SubscriptionProvider,
    private langServ: LanguageService,
    private statusServ: StatusService,
    private textServ: TextProvider,
    private formBuilder: FormBuilder,
    private fileChooser: FileChooser,
    private filePicker: IOSFilePicker,
    private platformServ: PlatformService,
    private file: File,
    private filePath: FilePath,
    private cDefRef: ChangeDetectorRef
  ) {
    this.subscriptionServ.getSubscription().subscribe(s => {
      this.subscription = s;
    });
  }
  buildForm() {
    console.log('form buid')
    this.form = this.formBuilder.group({
      selectedFile: [
        null,
        Validators.compose([
          Validators.required,
          AppValidators.filenameExtension(this.authorizedExtensions)
        ])
      ]
    });
    console.log('form built')

  }
  ionViewCanEnter(): boolean {
    console.log("ionViewCanEnter", this.subscriptionServ.hasOCRRemaining());
    this.hasOCRRemaining = this.subscriptionServ.hasOCRRemaining();
    if (!this.hasOCRRemaining) {
      this.authorizedExtensions = this.textExtensions
      this.authorizedMimes = this.textMimes
      this.statusServ.setWarning(
        this.langServ.getText("text.import.ocr.quotaReached"), this.langServ.getText("text.reloadOcr")
      ).subscribe((r) => {
        let tabs: Tabs = this.navCtrl.parent
        tabs.select(2)
        tabs.getByIndex(2).push('OffersStep1Page')
      })
    } else {
      this.authorizedExtensions = this.textExtensions.concat(this.ocrExtensions)
      this.authorizedMimes = this.textMimes.concat(this.ocrMimes)
    }
    console.log('authorizedExtensions', this.authorizedExtensions);
    this.buildForm()
    //let user enter in any case
    console.log('return true')
    return true;
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad TextImportPage");
  }
  upload() {
    if (this.form.valid) {
      console.log("uploading file", this.selectedFileUri);
      this.textServ.importFileUri(this.selectedFileUri).subscribe(
        r => {
          let html = r.response;
          console.log("import file HTML returned", html);
          this.statusServ.setSuccess(
            this.langServ.getText("text.import.success")
          );
          this.navCtrl.push("TextCreatePage", { html: html });
        },
        e => {
          console.log("import file error", e);
          this.statusServ.setError(this.langServ.getText("text.import.error"));
        }
      );
    }
  }
  isFileImported(): boolean {
    return this.selectedFileUri != null;
  }
  browse() {
    console.log(this.fileInput);
    let promise = null;
    if (this.platformServ.isiOS()) {
      promise = this.filePicker.pickFile()
    } else {
      promise = this.fileChooser.open()
    }
    promise.then((uri) => {
      this.onFileSelectedChange(uri)
    })
      .catch(err => console.log('pickFile error:' + err));
  }
  onFileSelectedChange(uri) {
    console.log("uri",uri);    
    this.form["submit"] = true;
      if (this.platformServ.isAndroid()) {
        this.filePath.resolveNativePath(uri).then((filePath) => {
          this.selectedFileUri = filePath;
          this.form.controls["selectedFile"].setValue(this.selectedFileUri);
          this.cDefRef.detectChanges()
        })
      } else {
        this.selectedFileUri = uri;
        this.form.controls["selectedFile"].setValue(this.selectedFileUri);
        this.cDefRef.detectChanges()
      }
      console.log("selectedFile", this.selectedFileUri, this.form);
  }
  selectedFileName(): string {
    console.log("selectedFileName", this.selectedFileUri)
    if (this.selectedFileUri) {
      let parts = this.selectedFileUri.split('/')
      return parts[parts.length - 1]
    } else {
      return null
    }
  }
  getFileInfo(fileUri): Observable<any> {
    return new Observable<any>((o) => {
      this.file.resolveLocalFilesystemUrl(fileUri)
        .then((entry: FileEntry) => {
          return new Promise((resolve, reject) => {
            entry.file(meta => resolve(meta), error => reject(error));
          });
        })
        .then((meta: IFile) => {
          let fileInfo: any = {}
          console.log('meta', meta)
          fileInfo.name = meta.name;
          fileInfo.type = meta.type; // This is a value compatible with the 'Content-Type' HTTP header
          fileInfo.size = meta.size;
          o.next(fileInfo);
          o.complete()
        })
        .catch((e) => {
          console.log('file info error', e)
          o.error(e)
          o.complete()
        })


    })
  }
}
