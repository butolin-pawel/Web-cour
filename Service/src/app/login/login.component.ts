import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  faCross = faClose;
  email : string = "";
  password : string = "";
  who : string = 'администратор';
  display : string = 'клиент'
  whoIn : boolean = false;
  static isModal : boolean =false;
  constructor(private auth : AuthService,private router: Router, public bsModalRef:BsModalRef,private toastr: ToastrService){
  }
  ngOnInit(): void {
    this.auth.validateToken().subscribe((res) => {
      console.log(res);

      if(Object.entries(res)[0][1])
      {
        if(!Object.entries(res)[1][1])
      this.router.navigate(['/account']);
      else
      this.router.navigate(['/admin']);
      }
      else
      this.auth.resetToken();
    })
  }
  onSubmit(){
    console.log(this.whoIn);

    if(!this.whoIn)
    {this.auth.login(this.email,this.password).subscribe(response  => {
      this.auth.saveToken(response);
      if(!this.retBo())
      this.router.navigate(['/account']);
      else
      this.close();
    },(error: any) => {
      console.log("Езжии брат ошибка");

      console.log(error);

      this.toastr.error("Проверьте правильность данных","Ошибка входа");

    });}
    else{
      this.auth.loginAdm(this.email,this.password).subscribe(response  => {
        this.auth.saveToken(response);
        if(!this.retBo())
        this.router.navigate(['/admin']);
        else
        this.close();
      },(error: any) => {

        console.log(error);

        this.toastr.error("Проверьте правильность данных","Ошибка входа");

      });
    }
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
  ChangeRole(){
    if(this.whoIn){
      this.who = 'администратор';
      this.display = 'клиент';
      this.whoIn = !this.whoIn;
    }
    else{
      this.who = 'клиент';
      this.display = 'администратор';
      this.whoIn = !this.whoIn;
    }
  }
}

