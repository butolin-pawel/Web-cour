import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../Class/user';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { RequestService } from '../services/request.service';
import { Request } from '../Class/request';

@Component({
  selector: 'app-kabinet',
  templateUrl: './kabinet.component.html',
  styleUrls: ['./kabinet.component.css']
})
export class KabinetComponent implements OnInit{
  user! : User;
  constructor(private auth :AuthService, private router: Router,private reqServ : RequestService){
    this.user = new User();
  }
  ngOnInit(): void {
      this.auth.validateToken().subscribe((res) =>{

        if(res){
          this.auth.getUser().subscribe(responce =>{

              this.user = responce;


          })
        }
        else{
          this.router.navigate(['/login']);
        }
      })
  }
  formatRussianDate(date: Date): string {
    return moment(date).locale('ru').format('DD MMMM YYYY hh:mm');
  }
  checkStatus(st : string){
    if(st == 'Завершена')
    return true;
    else
    return false;
  }
  logouts(){
    // this.auth.logouts().subscribe(()=>{
    //   this.auth.resetToken();
    //   this.router.navigate(['/login']);
    // }
    // )
    this.auth.resetToken();
    this.router.navigate(['/login']);
  }
  pay(req : Request){
    this.reqServ.payFor(req).subscribe(()=>{
      this.auth.getUser().subscribe(responce =>{

        this.user = responce;


    })
    })
  }
  cancelReq(req : Request){
    this.reqServ.cancel(req).subscribe(()=>{
      this.auth.getUser().subscribe(responce =>{

        this.user = responce;


    })
    })
  }
}
