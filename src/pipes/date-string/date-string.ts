import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Generated class for the DateStringPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateString',
})
export class DateStringPipe implements PipeTransform {
  /**
   * Takes a date string and formats it.
   */
  transform(value: string, ...args) {
    let format : string = args[0];
    return moment(value).format(format);
  }
}
