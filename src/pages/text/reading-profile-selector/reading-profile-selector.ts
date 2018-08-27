import { Component, Output, EventEmitter } from "@angular/core";
import { ReadingProfile } from "../../../models/reading-profile/reading-profile";
import { ReadingProfileProvider } from "../../../providers/reading-profile/reading-profile";

/**
 * Generated class for the ReadingProfileSelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "reading-profile-selector",
  templateUrl: "reading-profile-selector.html"
})
export class ReadingProfileSelectorComponent {
  selectedProfile: number;
  readingProfiles: ReadingProfile[] = [];
  @Output("onProfileSelected")
  onProfileSelected: EventEmitter<number> = new EventEmitter();
  constructor(private readingProfileServ: ReadingProfileProvider) {
    console.log("Hello ReadingProfileSelectorComponent Component");
    this.getList();
  }
  getList() {
    this.readingProfileServ.getList().subscribe(list => {
      this.readingProfiles = [];
      list.forEach(p => {
        if (p.leaf == true) {
          this.readingProfiles.push(p);
        } else {
          p.profiles.forEach(subP => {
            if (subP.leaf == true) {
              this.readingProfiles.push(subP);
            }
          });
        }
      });
      console.log("readingProfiles", this.readingProfiles);
      if (this.readingProfiles.length > 0) {
        this.selectedProfile = this.readingProfiles[0].id
        this.onProfileChange(this.readingProfiles[0].id)
      }
    });
  }
  onProfileChange(profileId: number) {
    this.onProfileSelected.emit(profileId);
  }
}
