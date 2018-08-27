import { Component, ChangeDetectorRef } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  ModalController
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  ReadingProfile,
  Process,
  FONT_GROUP,
  TYPO_GROUP,
  LETTER_GROUP,
  SOUND_GROUP,
  SPECIFIC_GROUP,
  FONT_SIZES,
  LETTER_DISTANCES,
  WORD_DISTANCES,
  LINE_HEIGHTS
} from "../../../models/reading-profile/reading-profile";
import { ReadingProfileProvider } from "../../../providers/reading-profile/reading-profile";
import { deepcopy } from "../../../providers/utils/utils";
import { StatusService } from "../../../components/status/status.service";
import { LanguageService } from "../../../providers/language/language.service";
import { SubscriptionProvider } from "../../../providers/subscription/subscription";
import { READING_PROFILE_LIST_REFRESH } from "../../../app/events/events";
import { Observable } from "rxjs/Observable";
import { TextAdaptProvider } from "../../../providers/text/adapt/text-adapt";
import { AppValidators } from "../../../components/validators/validators";

/**
 * Generated class for the ReadingProfileItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const defaultText="Pour que la lecture devienne ou redevienne un plaisir."
@IonicPage()
@Component({
  selector: "page-reading-profile-item",
  templateUrl: "reading-profile-item.html"
})
export class ReadingProfileItemPage {
  public form: FormGroup;
  public profile: ReadingProfile;
  public folders: ReadingProfile[] = [];
  public countryList = <any>[];
  public categoryList = <any>[];
  private processList: Process[];
  public selectedFolder: any = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private readingProfileServ: ReadingProfileProvider,
    private statusServ: StatusService,
    private langServ: LanguageService,
    private subscriptionServ: SubscriptionProvider,
    private events: Events,
    private modalCtrl: ModalController,
    private cDetRef: ChangeDetectorRef,
    private textAdapter: TextAdaptProvider
  ) {
    this.profile = deepcopy(this.navParams.data) as ReadingProfile;
    if (this.profile.profileGroup) {
      this.selectedFolder = this.profile.profileGroup.id;
    }
    console.log("profile", this.profile);
    this.form = this.formBuilder.group({
      name: [this.profile.name, [Validators.required,AppValidators.noWhiteSpaces()]],
      processes: [this.profile.processes, []],
      selectedFolder: []
    });
    this.getProcesses().subscribe()
    this.getFolders().subscribe()
  }

  getProcesses(): Observable<Process[]> {
    return new Observable<Process[]> ((o=>{
      this.readingProfileServ.getProcessList().subscribe(r => {
        this.processList = r;
        o.next()
        o.complete()
      });  
    }))
  }
  getFolders(): Observable<ReadingProfile[]> {
    return new Observable<ReadingProfile[]> ((o=>{
    this.readingProfileServ.getList().subscribe(r => {
      this.folders = r.filter(p => p.leaf == false);
      o.next()
      o.complete()
    });  
  }))
}
  ionViewCanEnter(): boolean {
    console.log(
      "ionViewCanEnter",
      this.subscriptionServ.hasProfileRemaining(),
      this.isUpdate()
    );
    let authorized =
      this.subscriptionServ.hasProfileRemaining() || this.isUpdate();
    if (!authorized) {
      this.statusServ.setError(
        this.langServ.getText("readingProfileItem.unauthorized")
      );
    }
    return authorized;
  }
  isUpdate(): boolean {
    return this.profile && this.profile.id != null;
  }

  edit() {
    console.log("edit", this.form);
    this.save().subscribe((()=>{
      this.navCtrl.popToRoot()
    }))
  }
  save():Observable<any>{
    return new Observable<any>((o)=>{
      this.form["submit"] = true;
      this.form["apiError"] = null;
      if (this.form.valid) {
        this.form["submitting"] = true;
        this.readingProfileServ.save(this.profile).subscribe(
          response => {
            console.log("edit success", response);
            this.form["submitting"] = false;
            this.statusServ.setSuccess(
              this.langServ.getText("readingProfileItem.save.success")
            );
            this.events.publish(READING_PROFILE_LIST_REFRESH);
            this.profile.id = response.id
            o.next()
            o.complete()
          },
          e => {
            console.log("edit error", e);
            this.form["apiError"] = e.error.message;
            this.form["submitting"] = false;
            this.statusServ.setError(
              this.langServ.getText("readingProfileItem.save.error")
            );
            o.error()
            o.complete()
          }
        );
      }
    })
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReadingProfileItemPage");
  }

  /* Process lists */

  getProcessList(type: string): Process[] {
    return (
      this.processList && this.processList.filter(p => p.groupName == type)
    );
  }
  getFonts(): Process[] {
    return this.getProcessList(FONT_GROUP);
  }
  getTypos(): Process[] {
    return this.getProcessList(TYPO_GROUP);
  }
  getLetters(): Process[] {
    return this.getProcessList(LETTER_GROUP);
  }
  getSounds(): Process[] {
    return this.getProcessList(SOUND_GROUP);
  }
  getSpecifics(): Process[] {
    return this.getProcessList(SPECIFIC_GROUP);
  }

  /* Process handling */

  getSelectedProcess(id: number) {
    return (
      this.profile.processes && this.profile.processes.find(p => p.id == id)
    );
  }

  getSelectedProcessByGroup(groupName: string) {
    console.log(groupName, this.profile.processes);
    return (
      this.profile.processes &&
      this.profile.processes.find(p => p.groupName == groupName)
    );
  }
  isProcessSelected(id: number) {
    return this.getSelectedProcess(id) != null;
  }
  selectProcess(id: number) {
    let p = this.getSelectedProcess(id);
    if (!p) {
      p = deepcopy(this.processList.find(p => p.id == id));
      if (!this.profile.processes) {
        this.profile.processes = [];
      }
      this.profile.processes.push(p);
    }
  }
  selectUniqueProcess(id: number) {
    let p = this.processList.find(p => p.id == id);
    let groupProcess = this.getSelectedProcessByGroup(p.groupName);
    if (groupProcess) {
      this.removeProcess(groupProcess.id);
    }
    this.selectProcess(id);
  }
  removeProcess(id: number) {
    let i = this.profile.processes.findIndex(p => p.id == id);
    if (i >= 0) {
      this.profile.processes.splice(i, 1);
    }
  }

  toggleProcess(id: number) {
    if (this.isProcessSelected(id)) {
      this.removeProcess(id);
    } else {
      this.selectProcess(id);
    }
  }

  /* Process group data */

  getFontSizes(): { label: string; value: string }[] {
    return FONT_SIZES;
  }
  getTypoChoices(id: number): { label: string; value: string }[] {
    switch (id) {
      case 1000129:
        return this.getLetterDistances();
      case 1000127:
        return this.getWordDistances();
      case 1000128:
        return this.getLineHeights();
    }
  }
  isValuableTypo(id: number): boolean {
    return [1000129, 1000127, 1000128].indexOf(id) >= 0;
  }
  isSimpleTypo(id: number): boolean {
    return [1000074].indexOf(id) >= 0;
  }
  isStyleableTypo(id: number): boolean {
    return !this.isValuableTypo(id) && !this.isSimpleTypo(id);
  }
  getLetterDistances(): { label: string; value: string }[] {
    return LETTER_DISTANCES;
  }
  getWordDistances(): { label: string; value: string }[] {
    return WORD_DISTANCES;
  }
  getLineHeights(): { label: string; value: string }[] {
    return LINE_HEIGHTS;
  }

  /* Csslines handling */

  getFontSizeCssLine(id: number, index: number = 0) {
    return this.getSelectedProcess(id).cssLines.filter(
      l => l.name == "Font Size"
    )[index];
  }
  getColorCssLine(id: number, index: number = 0) {
    return this.getSelectedProcess(id).cssLines.filter(
      l => l.declaration == "color"
    )[index];
  }
  getBoldCssLine(id: number, index: number = 0) {
    return this.getSelectedProcess(id).cssLines.filter(
      l => l.expression == "bold"
    )[index];
  }
  getItalicCssLine(id: number, index: number = 0) {
    return this.getSelectedProcess(id).cssLines.filter(
      l => l.expression == "italic"
    )[index];
  }
  getUnderlineCssLine(id: number, index: number = 0) {
    return this.getSelectedProcess(id).cssLines.filter(
      l => l.expression == "underline"
    )[index];
  }

  getSingleValueCssLine(id: number) {
    return this.getSelectedProcess(id).cssLines[0];
  }
  isSingleCssValueSelected(processId: number, value: any) {
    return (
      this.isProcessSelected(processId) &&
      this.getSingleValueCssLine(processId).param == value
    );
  }

  /* CssLines events */
  onFontSizeCssLineChange(processId: number, value: string, index: number = 0) {
    this.getFontSizeCssLine(processId, index).param = value;
    console.log("update profile", this.profile);
  }
  onColorCssLineChange(processId: number, value: string, index: number = 0) {
    this.getColorCssLine(processId, index).param = value;
    console.log("update profile", this.profile);
  }
  onBoldCssLineChange(processId: number, value: boolean, index: number = 0) {
    if (value) {
      this.getBoldCssLine(processId, index).param = "bold";
    } else {
      delete this.getBoldCssLine(processId, index).param;
    }
    console.log("update profile", this.profile);
  }
  onItalicCssLineChange(processId: number, value: boolean, index: number = 0) {
    if (value) {
      this.getItalicCssLine(processId, index).param = "italic";
    } else {
      delete this.getItalicCssLine(processId, index).param;
    }
    console.log("update profile", this.profile);
  }
  onUnderlineCssLineChange(
    processId: number,
    value: boolean,
    index: number = 0
  ) {
    if (value) {
      this.getUnderlineCssLine(processId, index).param = "underline";
    } else {
      delete this.getUnderlineCssLine(processId, index).param;
    }
    console.log("update profile", this.profile);
  }
  onSingleProcessChange(processId: number, value: any) {
    if (!this.isProcessSelected(processId)) {
      this.selectProcess(processId);
    }
    this.getSingleValueCssLine(processId).param = value;
  }
  onSelectGroup(value) {
    console.log("onSelectGroup", value);
    switch (value) {
      case "0":
        this.profile.profileGroup = null;
        break;
      case "-1":
        this.createFolder();
        break;
      default:
        let folder = this.folders.find(f => f.id == value);
        this.setFolder(folder);
        break;
    }
  }

  forwardTo(page, params) {
    console.log("forwardTo", page, params);
    this.navCtrl.push(page, params);
  }
  createFolder() {
    let newFolder = new ReadingProfile()
    let modal = this.modalCtrl.create("FolderEditPage",{folder:newFolder});
    modal.present();
    modal.onDidDismiss((folder: ReadingProfile) => {
      if (folder) {
        this.onFolderCreate(folder);
      }
    });
  }
  onFolderCreate(folder: ReadingProfile) {
    this.getFolders().subscribe((f)=>{
      this.setFolder(folder);
      this.form.controls["selectedFolder"].setValue(this.profile.profileGroup.id);
      this.cDetRef.detectChanges()
    })
  }
  setFolder(folder: ReadingProfile) {
    this.profile.profileGroup = { id: folder.id, name: folder.name };
    console.log("folder set", this.profile);
  }
  onAdaptProfile(){
    this.save().subscribe(()=>{
      this.readingProfileServ.get(this.profile.id).subscribe((p)=>{
        this.textAdapter
        .adapt(defaultText, p)
        .subscribe(html => {
          this.modalCtrl.create('TextAdaptModalPage', { html} ).present()
        });
      })      
    })
   }
}

