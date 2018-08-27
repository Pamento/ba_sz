import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import *  as moment from 'moment/moment'
import { LanguageService } from '../language/language.service'
/*
  Generated class for the Date provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DateService {
  private weekDays: any[]
  constructor(public http: HttpClient, private langServ: LanguageService) {
    console.log('Hello Date Provider');
    this.setLang(this.langServ.getCurrent())
    this.setWeekDays()
  }

  getWeekDays(index?): any {
    return index != null ? this.weekDays[index] : this.weekDays
  }

  today(): moment.Moment {
    let m = moment()
      .startOf('day')
    return m;
  }
  tomorrow() {
    return this.today().add(1, 'day')
  }
  date(date: string): moment.Moment {
    let m = moment(date)
    return m;
  }
  moment(date?: string): moment.Moment {
    return date ? this.date(date) : this.today()
  }
  now() {
    return moment()
  }

  utcMoment(date?) {
    let m: moment.Moment;
    if (date) {
      m = moment.utc(date)
    } else {
      m = moment.utc();
      m.startOf('day')
    }
    return m;

  }

  setWeekDays() {
    this.weekDays = []
    let USWeekDaysOrder = moment.weekdaysMin()
    let localeWeekDaysOrder = moment.weekdaysMin(true)
    localeWeekDaysOrder.map((day, index) => {
      console.log('locale day', day, index)
      let USDayIndex = USWeekDaysOrder.indexOf(day)
      this.weekDays.push({
        index: USDayIndex,
        day: day
      })
    })
    //order weekdays if fr/...
    console.log('weekDays set', this.weekDays)
  }
  setLang(lang) {
    moment.locale(lang)
    switch (lang) {
      case 'fr':
        break;
      default:
        break;
    }
  }

  buildWeeks(selectedDay, WEEK_COUNT): any[] {
    let weeks = [], startWeek
    if (selectedDay.day() == 0) {
      startWeek = (selectedDay.week() - 1)
    } else {
      startWeek = selectedDay.week()
    }
    let currentWeekNumber = startWeek
    for (let i = 0; i < WEEK_COUNT; i++) {
      weeks.push(
        this.buildWeekDays(currentWeekNumber)
      )
      currentWeekNumber++;
    }
    console.log("weeks built", weeks)
    return weeks;
  }
  buildWeekDays(weekNumber) {
    let week = []
    let firstDay;
    this.getWeekDays().forEach((weekDay, index) => {
      console.log("weekDay", weekDay)
      if (!firstDay) {
        firstDay = moment().week(weekNumber).day(weekDay["index"])
        console.log("firstDay", firstDay)
      }
      let currentDay = firstDay.clone().add(index, 'days')
      week.push(
        {
          index: weekDay["index"],
          day: currentDay
        }
      );
    }
    )
    console.log("week built", week)
    return week
  }
  getDurationString(moment: moment.Moment): string {
    let now = this.now()
    let diff = now.diff(moment, 'seconds');
    let unit = "seconds"
    if (diff > 60) {
      unit = "minutes";
      diff = now.diff(moment, 'minutes');
      if (diff > 60) {
        unit = "hours";
        diff = now.diff(moment, 'hours');
        if (diff > 24) {
          unit = "days";
          diff = now.diff(moment, 'days');
          if (diff > 31) {
            unit = "month";
            diff = now.diff(moment, 'month');
            if (diff > 11) {
              unit = "years";
              diff = now.diff(moment, 'years');
            }
          }
        }
      }
    }
    return this.langServ.getText(unit, { count: diff });
  }
  getMinutesMoment(moment: moment.Moment): number {
    return moment.hours() * 60 + moment.minutes()
  }
}
