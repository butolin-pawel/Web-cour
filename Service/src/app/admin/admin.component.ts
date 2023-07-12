import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private auth :AuthService, private router: Router){
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
