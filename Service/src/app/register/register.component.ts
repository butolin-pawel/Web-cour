import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../Class/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newClient : User = new User();
  today! : string;
  constructor(private auth : AuthService,private router: Router){
    this.today = new Date().toISOString().slice(0, 16);
  }
  reg(){
    this.auth.register(this.newClient).subscribe((response)=>{
      this.auth.saveToken(response);
      this.auth.login(this.newClient.email,this.newClient.password).subscribe(()=>{
        this.router.navigate(['/account']);
      })
    });
  }
}
