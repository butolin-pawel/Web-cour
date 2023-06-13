import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-timing',
  templateUrl: './timing.component.html',
  styleUrls: ['./timing.component.css']
})
export class TimingComponent {
  selectedDate: Date;
  nextDates: Date[] = [];
  constructor(){
    this.selectedDate = new Date();
  }
  ngOnInit() {
    this.selectedDate = new Date();
    this.calculateNextDates();
  }

  onDateChange(event: Event) {
    const selectedDateValue = (event.target as HTMLInputElement).value;
    this.selectedDate = new Date(selectedDateValue);
    this.calculateNextDates();
  }

  calculateNextDates() {
    this.nextDates = [];
    const nextDay = new Date(this.selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    this.nextDates.push(nextDay);
    const dayAfterTomorrow = new Date(this.selectedDate);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    this.nextDates.push(dayAfterTomorrow);
  }

  formatRussianDate(date: Date): string {
    return moment(date).locale('ru').format('DD MMMM');
  }
}


