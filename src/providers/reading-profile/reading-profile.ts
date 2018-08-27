import { Injectable } from "@angular/core";
import { RestService } from "../rest/rest.service";
import {
  ReadingProfile,
  Process
} from "models/reading-profile/reading-profile";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the ReadingProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReadingProfileProvider {
  private path = "profiles";
  private readingProfiles: ReadingProfile[];
  private processes: Process[];

  constructor(private restServ: RestService) {
    console.log("Hello ReadingProfileProvider");
  }
  getList(options = null): Observable<ReadingProfile[]> {
    return this.restServ
      .get(this.path + "/all", options)
      .map(r => (this.readingProfiles = r));
  }
  get(id: number): Observable<ReadingProfile> {
    return this.restServ.get(`${this.path}/profile/${id}`);
  }
  getProcessList(): Observable<Process[]> {
    return this.restServ
      .get(this.path + "/process/all")
      .map(r => (this.processes = r));
  }
  save(profile: ReadingProfile): Observable<ReadingProfile> {
    return this.restServ.post(`${this.path}/profile/save`, profile);
  }
  delete(profile: ReadingProfile): Observable<any> {
    return this.restServ.delete(`${this.path}/profile/delete/${profile.id}`);
  }
  saveFolder(folder: ReadingProfile): Observable<ReadingProfile> {
    return folder.id ? this.updateFolder(folder) : this.createFolder(folder);
  }
  createFolder(folder: ReadingProfile): Observable<ReadingProfile> {
    return this.restServ.post(
      `${this.path}/group/create`,
      JSON.stringify(folder.name),
      {
        "Content-Type": "application/json",
        responseType: "json"
      }
    );
  }
  updateFolder(folder: ReadingProfile): Observable<ReadingProfile> {
    return this.restServ.post(`${this.path}/group/update`, folder);
  }
  countProfiles(): number {
    return this.readingProfiles.length;
  }
}
