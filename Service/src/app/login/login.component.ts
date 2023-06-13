import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email : string = "";
  password : string = "";
  constructor(private auth : AuthService,private router: Router){

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
      this.router.navigate(['/account']);

    }),(error: any) => {


    };
  }
}

