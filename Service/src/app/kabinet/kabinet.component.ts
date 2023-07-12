import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../Class/user';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { RequestService } from '../services/request.service';
import { Request } from '../Class/request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kabinet',
  templateUrl: './kabinet.component.html',
  styleUrls: ['./kabinet.component.css']
})
export class KabinetComponent implements OnInit{
  user! : User;
  constructor(private auth :AuthService, private router: Router,private reqServ : RequestService,private toastr: ToastrService){
    this.user = new User();
  }
  ngOnInit(): void {
      this.auth.validateToken().subscribe((res) =>{

        if(res){
          this.auth.getUser().subscribe(responce =>{


              this.user = responce;
              this.reqServ.byClient(this.user.id).subscribe((responce) =>{
                this.user.requests = responce;
              })

          })
        }
        else{
          this.router.navigate(['/login']);
        }
      })
  }
  formatRussianDate(date: Date): string {
    return moment(date).locale('ru').format('DD MMMM YYYY HH:mm');
  }
  checkStatus(st : string){
    if(st == 'Завершена')
    return true;
    else
    return false;
  }
  checkSt(st : string){
    if(st == 'Создана')
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
  download(req : Request){
    this.reqServ.download(req).subscribe((response) =>{

      const blob = new Blob([response], { type: 'xlsx' });
        const url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('target', 'blank');
        a.href = url;
        a.download = "АРТ№"+req.id+'.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    })
  }
  pay(req : Request){
    this.reqServ.payFor(req).subscribe(()=>{
      this.auth.getUser().subscribe(responce =>{

        this.user = responce;
        this.toastr.success('Оплачено', 'Успешно');

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
