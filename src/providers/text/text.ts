import { Injectable } from "@angular/core";
import { RestService } from "../rest/rest.service";
import { Observable } from "rxjs/Observable";
/*
  Generated class for the TextProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TextProvider {
  path: string = "linguistics";
  constructor(public restServ: RestService) {
    console.log("Hello TextProvider Provider");
  }
  importFile(file: File): Observable<string> {
    return this.restServ.postFormData(`${this.path}/convert`, file, {
      responseType: "text"
    });
  }
  importFileUri(fileUri: string): Observable<any> {
    return this.restServ.uploadFile(
      `${this.path}/convert`,
      fileUri,
      `file.${this.getExtension(fileUri)}`,
      "file"
    );
  }
  getExtension(path: string): string {
    const parts = path.split('/')
    const filename = parts[parts.length - 1]
    const filenameParts = filename.split('.')
    return filenameParts[filenameParts.length - 1]
  }
  convertHtml(
    content: string,
    profileId: number,
    fileName: string
  ): Observable<Blob> {
    return this.restServ.post(
      `${this.path}/convertHtml`,
      {
        fileName,
        content,
        profileId
      },
      {
        responseType: "blob"
      }
    );
  }
}
