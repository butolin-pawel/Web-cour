import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { faClose } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  faCross = faClose;
  email : string = "";
  password : string = "";
  static isModal : boolean =false;
  constructor(private auth : AuthService,private router: Router, public bsModalRef:BsModalRef){
  }
  ngOnInit(): void {
    this.auth.validateToken().subscribe((res) => {
      if(res)
      this.router.navigate(['/account']);
    })
  }
  onSubmit(){
    this.auth.login(this.email,this.password).subscribe(response  => {
      this.auth.saveToken(response);
      if(!this.retBo())
      this.router.navigate(['/account']);
      else
      this.close();
    }),(error: any) => {


    };
  }
  retBo(){
    return LoginComponent.isModal;
  }
  public static change(){
      this.isModal = !this.isModal;
  }
  close(){
    LoginComponent.change();
    this.bsModalRef.hide();
  }
  gotoreg(){
    if(this.retBo()){

      this.close();
      this.router.navigate(['/registration']);
    }
    else{
      this.router.navigate(['/registration']);
    }
  }
}

