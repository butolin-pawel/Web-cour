import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { Request } from '../Class/request';
import * as moment from 'moment';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-reqlist',
  templateUrl: './reqlist.component.html',
  styleUrls: ['./reqlist.component.css']
})
export class ReqlistComponent implements OnInit{
  listRequest : Request[] = [];
  filterNumber : string = '';
  filterSurname : string = '';
  arrowdown = faCaretDown;
  drop(req : Request){


    req.info = !req.info;
  }
  ngOnInit(): void {
    this.reqService.futureList().subscribe((responce) => {

      this.listRequest = responce ;
      console.log(this.listRequest);

    })
  }
  Future(){
    this.reqService.futureList().subscribe((responce) => {

      this.listRequest = responce ;
      this.Filter();
    })
  }
  Finish(){
    this.reqService.finishList().subscribe((responce) => {

      this.listRequest = responce ;
      this.Filter();

    })
  }
  constructor(private reqService : RequestService,private toastr: ToastrService){

  }
  Filter(){
    this.listRequest = this.listRequest.filter((element) => {
      if(this.filterNumber != '' && !element.clientNavigation.phonenumber.toLowerCase().includes(this.filterNumber.toLowerCase()))
      return false;
      if(this.filterSurname != '' && !element.clientNavigation.surname.toLowerCase().includes(this.filterSurname.toLowerCase()))
      return false;
      return true;
    })
  }
  Reset(){
    this.filterNumber = '';
    this.filterSurname = '';
    this.Future();
  }
  cancelReq(req : Request){
    this.reqService.cancel(req).subscribe(()=>{
     this.Future();
    })
  }
  accept(req : Request){
    if(req.statusNavigation.id != 2){
      alert("К оплате " + req.summ);
    }
    this.reqService.acceptReq(req).subscribe(() =>{
      this.toastr.success('Завершено', 'Успешно');
      this.Finish();
    },(error) => {
      this.toastr.error('Попробуйте ещё', 'Ошибка');
    })
  }
  formatRussianDate(date: Date): string {
    return moment(date).locale('ru').format('DD MMMM YYYY HH:mm');
  }
}
