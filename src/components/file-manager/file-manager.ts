import { Injectable } from '@angular/core';
import { FileOpener } from "@ionic-native/file-opener";
import { FileEntry, File } from '@ionic-native/file';
import { Observable } from 'rxjs/Observable'
import { fromPromise } from 'rxjs/observable/fromPromise';
/**
 * Generated class for the FileManagerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Injectable()
export class FileManagerService {
  constructor(
    private file: File,
    private fileOpener: FileOpener
  ) {
    console.log('Hello FileManagerService');
  }

  write(file: Blob, fileName: string): Observable<FileEntry> {
    return fromPromise(
      this.file.writeFile(this.file.dataDirectory, fileName, file, {
        replace: true
      })
        .catch((e) => {
          console.log('write error', e);
        })
    )
  }
  open(fileName: string): Observable<any> {
    let ext = fileName.split('.')[1]
    return fromPromise(this.fileOpener.open(this.file.dataDirectory + fileName, this.getMIMEtype(ext)))
  }
  writeAndOpen(file: Blob, fileName: string): Observable<any> {
    return new Observable<any>((o) => {
      this.write(file, fileName).subscribe((file: FileEntry) => {
        this.open(fileName).subscribe((r) => {
          o.next(r)
          o.complete()
        },(e)=>{
          o.error()
          o.complete()
        })
      },()=>{
        o.error()
        o.complete()
      })
    })

  }
  getMIMEtype(extn) {
    let ext = extn.toLowerCase();
    let MIMETypes = {
      'txt': 'text/plain',
      'odt': 'application/vnd.oasis.opendocument.text',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc': 'application/msword',
      'pdf': 'application/pdf',
      'jpg': 'image/jpeg',
      'bmp': 'image/bmp',
      'png': 'image/png',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf': 'application/rtf',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
    return MIMETypes[ext];
  }

}
