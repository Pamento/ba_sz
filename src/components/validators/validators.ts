import { ValidatorFn, FormArray, FormControl } from "@angular/forms";
import { Injectable } from "@angular/core";
@Injectable()
export class AppValidators {
  static minLengthArray(min: number): ValidatorFn {
    return function (control: FormControl) {
      var v = control.value;
      return v.length >= min ? null : { minLengthArray: true };
    };
  }
  static exactLength(length: number): ValidatorFn {
    return function (control: FormControl) {
      var v = control.value.toString();
      return v.length == length ? null : { exactLength: true };
    };
  }
  static maxCheckBoxes(max: Number): ValidatorFn {
    return function (formArray: FormArray) {
      console.log("formArray", formArray, max);
      let checked = 0;
      for (let i = 0; i < formArray.controls.length; i++) {
        let control = formArray.controls[i];
        console.log("control", control);
        if (control.value) {
          checked++;
        }
      }
      return checked <= max ? null : { maxCheckBoxes: true };
    };
  }
  static emailAvailable(service, asyncFunc): ValidatorFn {
    return (control: FormControl) => {
      return service[asyncFunc](control.value).map(available => {
        return !available ? { emailAvailable: true } : null;
      });
    };
  }
  static fileExtension(extensions: string[]): ValidatorFn {
    return function (control: FormControl) {
      const file = control.value as File;
      if (!file || !file.name) return null;
      let parts = file.name.split("."),
        extIdx = parts.length - 1,
        ext = `.${parts[extIdx]}`;
      return extensions.indexOf(ext) >= 0 ? null : { fileExtension: true };
    };
  }
  static filenameExtension(extensions: string[]): ValidatorFn {
    return function (control: FormControl) {
      const filename = control.value;
      if (!filename) return null;
      let parts = filename.split("."),
        extIdx = parts.length - 1,
        ext = `.${parts[extIdx]}`;
      return extensions.indexOf(ext) >= 0 ? null : { fileExtension: true };
    };
  }
  static mimeType(mimes: string[]): ValidatorFn {
    return function (control: FormControl) {
      const fileMeta = control.value
      console.log('mime check', fileMeta, mimes)
      return mimes.indexOf(fileMeta) >= 0 ? null : { mimeType: true };
    };
  }
  static noWhiteSpaces(): ValidatorFn {
    return function (control: FormControl) {
      const v = control.value;
      return v && v.trim().length > 0 ? null : { noWhiteSpaces: true };
    };
  }

}
