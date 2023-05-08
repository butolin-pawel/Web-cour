import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';

@Component({
  selector: 'app-timing',
  templateUrl: './timing.component.html',
  styleUrls: ['./timing.component.css']
})
export class TimingComponent {
  constructor (){
    this.date  = new Date();
  }
  date :Date ;
  date_next :any;
  date_afternext :any;
  setdate(){
    this.date_next =  new Date(this.date.getTime() + (24 * 60 * 60 * 1000));
  this.date_afternext = new Date(this.date_next.getTime() + (24 * 60 * 60 * 1000))  }
;
  ngOnInit(): void {
    this.date  = new Date();
    this.setdate();
   }
}


