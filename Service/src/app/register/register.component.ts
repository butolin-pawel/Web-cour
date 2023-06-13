import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../Class/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newClient : User = new User();
  constructor(private auth : AuthService){

  }
  reg(){
    this.auth.register(this.newClient).subscribe();
  }
}
