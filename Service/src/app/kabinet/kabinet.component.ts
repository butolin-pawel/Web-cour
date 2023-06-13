import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../Class/user';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-kabinet',
  templateUrl: './kabinet.component.html',
  styleUrls: ['./kabinet.component.css']
})
export class KabinetComponent implements OnInit{
  user! : User;
  constructor(private auth :AuthService, private router: Router){
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

}
