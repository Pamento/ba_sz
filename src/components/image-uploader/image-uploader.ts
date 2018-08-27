import {
  Component,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  Input,
  ElementRef,
  ChangeDetectorRef
} from "@angular/core";
import { Camera } from "@ionic-native/camera";
import { Select } from "ionic-angular";
import { Observable } from "rxjs/Observable";
const IMG_QUALITY = 50;
const IMG_WIDTH = 512;
const IMG_HEIGHT = 512;
const DEFAULT_RESPONSE = "FILE_URI";
const DEFAULT_FILETYPE = "JPEG";
/*
  Generated class for the ImageUploader page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "image-uploader",
  templateUrl: "image-uploader.html",
  providers: [Camera]
})
export class ImageUploader {
  @ViewChild("fileInput") fileInput: ElementRef;
  fileObj: File;
  responseTypes = {
    DATA_URL: "DATA_URL",
    FILE_URI: "FILE_URI",
    NATIVE_URI: "NATIVE_URI",
    FILE_OBJECT: "FILE_OBJECT"
  };
  fileTypes = {
    JPEG: "JPEG",
    PNG: "PNG"
  };
  cameraOptions = this.getCameraOptions();
  selectVisible: boolean = false;
  @ViewChild("select") select: Select;
  @Output() onImageTaken: EventEmitter<string> = new EventEmitter<string>();
  @Input() sourceTypeTexts: any;
  @Input() cancelText: any;
  @Input() responseType: string;
  @Input() fileType: string;
  sourceTypeSelected = null;
  constructor(private camera: Camera, private cDetRef: ChangeDetectorRef) {
    console.log("construct ImageUploader", this);
  }
  ngOnInit() {
    this.setResponseType();
    this.setFileType();
  }
  setResponseType() {
    let responseType = this.responseType;
    console.log("responseType", this.responseType);
    this.responseType = DEFAULT_RESPONSE;
    if (responseType != null) {
      for (let key in this.responseTypes) {
        if (this.responseTypes[key] == responseType) {
          this.responseType = responseType;
          break;
        }
      }
    }
    console.log("responseType", this.responseType);
  }
  setFileType() {
    let fileType = this.fileType;
    console.log("fileType", this.fileType);
    this.fileType = DEFAULT_FILETYPE;
    if (fileType != null) {
      for (let key in this.fileTypes) {
        if (this.fileTypes[key] == fileType) {
          this.fileType = fileType;
          break;
        }
      }
    }
    console.log("responseType", this.responseType);
  }
  getCameraOptions(): any {
    return {
      selectOptions: this.getSelectOptions(),
      sourceTypes: this.getSourceTypes()
    };
  }

  getSelectOptions() {
    return {
      buttons: []
    };
  }

  getSourceTypes(): any[] {
    let sourceTypes = [
      {
        value: this.camera.PictureSourceType.CAMERA,
        text: "CAMERA"
      },
      {
        value: this.camera.PictureSourceType.PHOTOLIBRARY,
        text: "PHOTOLIBRARY"
      }
    ];
    return sourceTypes;
  }

  @HostListener("click", ["$event"])
  onClick(e) {
    console.log("img uploader click");
    this.chooseCameraSourceType();
  }

  take(source) {
    console.log("take", source, this.responseType, this.fileType);
    this.camera
      .getPicture({
        quality: IMG_QUALITY,
        targetWidth: IMG_WIDTH,
        targetHeight: IMG_HEIGHT,
        sourceType: parseInt(source),
        destinationType: this.camera.DestinationType[
          this.getInternalResponseType()
        ],
        encodingType: this.camera.EncodingType[this.fileType]
      })
      .then(
        data => {
          console.log("image taken", data);
          let response = data,
            obs: Observable<any>;
          if (this.responseType == this.responseTypes.FILE_OBJECT) {
            console.log("FILE_OBJECT");
            obs = this.getFileObject(data);
          } else {
            if (this.responseType == this.responseTypes.DATA_URL) {
              console.log("DATA_URL");
              response = "data:image/jpeg;base64," + data;
            }
            obs = Observable.of(response);
          }

          obs.subscribe(resp => {
            console.log("resp", resp);
            this.onImageTaken.emit(resp);
          });
        },
        e => {
          console.log("image taken error", e);
        }
      );
  }
  chooseCameraSourceType() {
    this.select.open();
  }
  getText(sourceTypeText): string {
    return this.sourceTypeTexts[sourceTypeText];
  }
  getFileObject(fileUri: string): Observable<File> {
    return new Observable<File>(o => {
      console.log("getFileObject", fileUri);
      this.fileInput.nativeElement.value = fileUri;
      this.cDetRef.detectChanges();
      console.log("fileObj", this.fileObj);

      o.next(this.fileObj);
      o.complete();
    });
  }
  getInternalResponseType(): string {
    switch (this.responseType) {
      case this.responseTypes.FILE_OBJECT:
        return this.responseTypes.NATIVE_URI;
      default:
        return this.responseType;
    }
  }
}
