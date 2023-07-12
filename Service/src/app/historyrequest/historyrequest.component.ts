import { Component, Injectable, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { User } from '../Class/user';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HistoryService } from '../services/history.service';
import { RequestService } from '../services/request.service';
import { Request } from '../Class/request';
import * as moment from 'moment';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-historyrequest',
  templateUrl: './historyrequest.component.html',
  styleUrls: ['./historyrequest.component.css']
})
export class HistoryrequestComponent implements OnInit{
  client! : User;
  listRequest : Request[] = [];
  faCross = faClose;

  arrowdown = faCaretDown;
  constructor(private bsModalRef:BsModalRef,private history : HistoryService,private reqServ : RequestService){

  }
  ngOnInit(): void {
    this.client = this.history.getClient();
    this.reqServ.byClient(this.client.id).subscribe((res)=>{
      this.listRequest = res;
    })
  }
  close(){
    this.bsModalRef.hide();
  }
  formatRussianDate(date: Date): string {
    return moment(date).locale('ru').format('DD MMMM YYYY HH:mm');
  }
  drop(req : Request){


    req.info = !req.info;
  }
}
