import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import * as moment from 'moment';
import { RequestService } from '../services/request.service';
import { DatePipe } from '@angular/common';
import { Timing } from '../Class/timing';
@Component({
  selector: 'app-timing',
  templateUrl: './timing.component.html',
  styleUrls: ['./timing.component.css']
})
export class TimingComponent {
  selectedDate: Date;
  nextDates: Date[] = [];
  firstColumnDate : Timing[] = [];
  secondColumnDate : Timing[] = [];
  thirdColumnDate : Timing[] = [];
  FirstColumnDate : Timing[] = [];
  SecondColumnDate : Timing[] = [];
  ThirdColumnDate : Timing[] = [];
  free : Timing;
  datePipe: DatePipe = new DatePipe('en-US');
  constructor(private reqServ : RequestService){
    this.selectedDate = new Date();
    this.free = this.freeDay();
  }
  ngOnInit() {
    this.selectedDate = new Date();
    this.selectedDate.setHours(0);


    this.reqServ.timing(this.selectedDate).subscribe((responce)=>{
      let res : any = responce;
      let dates : Date[][] = [];
      dates = res;
      dates.forEach((element : Date[]) => {

        let st  = new Date(element[0]).getDate();
        let interval : Timing = new Timing();
        interval.startdate = element[0];
        interval.enddate = element[1];
        interval.isBysy = true;
        switch(st){
          case new Date(this.selectedDate).getDate():
            this.firstColumnDate.push(interval);
            break;
          case new Date(this.nextDates[0]).getDate():
            this.secondColumnDate.push(interval);
            break;
          case new Date(this.nextDates[1]).getDate():
            this.thirdColumnDate.push(interval);
            break;
        }
      });
      this.displayTiming();
    })
    this.calculateNextDates();
  }
  displayTiming(){
    if(this.firstColumnDate.length != 0)
      this.FirstColumnDate = this.insertFree(this.firstColumnDate);
      else{
      this.FirstColumnDate = [];
      this.FirstColumnDate.push(this.free);
      }
      if(this.secondColumnDate.length != 0)
      this.SecondColumnDate = this.insertFree(this.secondColumnDate);
      else{
      this.SecondColumnDate = [];
      this.SecondColumnDate.push(this.free);
      }
      if(this.thirdColumnDate.length != 0)
      this.ThirdColumnDate = this.insertFree(this.thirdColumnDate);
      else{
      this.ThirdColumnDate = [];
      this.ThirdColumnDate.push(this.free);
      }
  }
  onDateChange(event: Event) {

    const selectedDateValue = (event.target as HTMLInputElement).value;
    this.selectedDate = new Date(selectedDateValue);
    this.selectedDate.setHours(0);

    this.reqServ.timing(this.selectedDate).subscribe((responce)=>{
      let res : any = responce;
      let dates : Date[][] = [];
      dates = res;
      this.firstColumnDate = [];
      this.secondColumnDate = [];
      this.thirdColumnDate = [];
      dates.forEach((element : Date[]) => {

        let st  = new Date(element[0]).getDate();
        let interval : Timing = new Timing();
        interval.startdate = element[0];
        interval.enddate = element[1];
        interval.isBysy = true;
        switch(st){
          case new Date(this.selectedDate).getDate():
            this.firstColumnDate.push(interval);
            break;
          case new Date(this.nextDates[0]).getDate():
            this.secondColumnDate.push(interval);
            break;
          case new Date(this.nextDates[1]).getDate():
            this.thirdColumnDate.push(interval);
            break;
        }
      });
      this.displayTiming();

    })
    this.calculateNextDates();
  }
  freeDay(){
    let date : Date = new Date();
    let endDay : Date = new Date();
    endDay.setHours(22,0,0);
    date.setHours(8,0,0);
    let temp : Timing = new Timing();
      temp.startdate = new Date( date.toISOString());
      temp.enddate = new Date( endDay.toISOString());
      temp.isBysy = false;
      return temp;
  }
  insertFree(mass : Timing[]){
    let result : Timing[] =[];
    let date : Date = new Date();
    let endDay : Date = new Date();
    endDay.setHours(22,0,0);
    date.setHours(8,0,0);
    mass.forEach((element)=>{


      if(new Date(element.startdate).getHours() != date.getHours() || new Date(element.startdate).getMinutes() != date.getMinutes() ){
        let temp : Timing = new Timing();
        temp.startdate = new Date( date.toISOString());
        temp.enddate = element.startdate;
        temp.isBysy = false;
        result.push(temp);

      }

        result.push(element);
        date.setHours(new Date (element.enddate).getHours(),new Date (element.enddate).getMinutes(),0);
    });
    if(new Date(mass[mass.length-1].enddate).getHours() <  endDay.getHours()){
      let temp : Timing = new Timing();
        temp.startdate = mass[mass.length-1].enddate;
        temp.enddate = endDay;
        temp.isBysy = false;
        result.push(temp);
    }
    return result;
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
   formatToHHMM(date: Date,date1 : Date): string{
      return moment(date).format('HH:mm') + ' - ' + moment(date1).format('HH:mm');
   }

  formatRussianDate(date: Date): string {
    return moment(date).locale('ru').format('DD MMMM');
  }

}


