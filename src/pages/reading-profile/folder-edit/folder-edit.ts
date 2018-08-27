import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReadingProfile } from '../../../models/reading-profile/reading-profile';
import { ReadingProfileProvider } from '../../../providers/reading-profile/reading-profile';
import { StatusService } from '../../../components/status/status.service';
import { LanguageService } from "../../../providers/language/language.service";

/**
 * Generated class for the FolderEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-folder-edit',
  templateUrl: 'folder-edit.html',
})
export class FolderEditPage {
  public form: FormGroup;
  public folder: ReadingProfile
  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private readingProfileServ: ReadingProfileProvider,
    private statusServ: StatusService,
    private formBuilder: FormBuilder,
    private langServ: LanguageService,
  ) {
    this.folder = this.navParams.get("folder") as ReadingProfile
    this.form = this.formBuilder.group({
      name: [this.folder.name, Validators.compose([Validators.required])],
    });
    console.log("folder", this.folder, this.navParams.data);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FolderEditPage');
  }
  edit() {
    this.form["submit"] = true;
    if (this.form.valid) {
      this.readingProfileServ.saveFolder(this.folder).subscribe((folder) => {
        this.statusServ.setSuccess(this.langServ.getText("folder.edit.success"))
        this.viewCtrl.dismiss(folder)
      },
        (e) => {
          this.statusServ.setError(this.langServ.getText("folder.edit.error"));
        })
    }
  }

}
