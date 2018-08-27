import { Pipe, PipeTransform } from "@angular/core";
import { DecimalPipe } from "@angular/common";
/*
  Generated class for the Pipes directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/

@Pipe({
  name: "hours"
})
export class Hours {
  transform(value, args) {
    console.log("Hours pipe", value, args);
    return ("0" + value).slice(-2);
  }
}

@Pipe({
  name: "minutes"
})
export class Minutes {
  transform(value, args) {
    console.log("Minutes pipe", value, args);
    return ("00" + value).slice(-2);
  }
}

@Pipe({
  name: "time"
})
export class Time {
  transform(value, args) {
    console.log("Time pipe", value, args);
    let separator = "h"; //todo i18n it
    return (
      new Hours().transform(value.toString().substring(0, 2), []) +
      separator +
      new Minutes().transform(value.toString().substring(2, 4), [])
    );
  }
}

@Pipe({
  name: "capitalize"
})

//todo
export class Capitalize {
  transform(value, args) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

@Pipe({
  name: "string"
})
export class String {
  transform(value, args) {
    return value.toString();
  }
}

@Pipe({
  name: "filter"
})
export class Filter {
  transform(array, name, value) {
    console.log("filter pipe", name, value);
    if (value) {
      return array.filter(item => item[name] == value);
    } else {
      return array;
    }
  }
}

@Pipe({
  name: "ordreBy"
})
export class OrderBy {
  transform(array, field) {
    console.log("orderBy pipe", field);
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}

@Pipe({
  name: "unique"
})
export class Unique {
  transform(array, field) {
    console.log("unique pipe", field);
    let result = [];
    for (let item of array) {
      console.log("item", item);
      if (!result.find(i => i[field] == item[field])) {
        result.push(item);
      }
    }
    return result;
  }
}

@Pipe({
  name: "price"
})
export class Price {
  transform(value, args) {
    console.log("Price pipe", value, args);
    let nbPipe = new DecimalPipe("fr");
    return nbPipe.transform(value, "1.02");
  }
}

@Pipe({ name: "keys" })
export class KeysPipe implements PipeTransform {
  transform(object, args: string[]): any {
    if (!object) return [];
    console.log("keys", object, Object.keys(object));
    return Object.keys(object);
  }
}

import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl
} from "@angular/platform-browser";
@Pipe({
  name: "safe"
})
export class SafePipe implements PipeTransform {
  constructor(protected _sanitizer: DomSanitizer) {}
  public transform(
    value: string,
    type: string
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case "html":
        return this._sanitizer.bypassSecurityTrustHtml(value);
      case "style":
        return this._sanitizer.bypassSecurityTrustStyle(value);
      case "script":
        return this._sanitizer.bypassSecurityTrustScript(value);
      case "url":
        return this._sanitizer.bypassSecurityTrustUrl(value);
      case "resourceUrl":
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Unable to bypass security for invalid type: ${type}`);
    }
  }
}
