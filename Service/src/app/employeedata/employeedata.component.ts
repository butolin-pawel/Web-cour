import { Component, OnInit } from '@angular/core';
import { Employee } from '../Class/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employeedata',
  templateUrl: './employeedata.component.html',
  styleUrls: ['./employeedata.component.css']
})
export class EmployeedataComponent implements OnInit{
  emp : Employee ;
  action : boolean = false;
  title : string = 'Добавление';
  passHash : string = '';
  constructor(private route: ActivatedRoute, private empService : EmployeeService, private router: Router){
    this.emp = new Employee();
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.action = false;
        this.title = 'Редактирование';
        this.empService.getById(this.route.snapshot.params['id']).subscribe((res)=>{
          this.emp = res;
          this.passHash = this.emp.password;
          this.emp.password = '';
        })
      } else {
        this.action = true;
      }
    });

  }
  onSubmit(){
    if(this.action){
        this.empService.save(this.emp).subscribe(() => {
          this.router.navigate(['/admin/employees']);
        })
    }
    else{
      if(this.emp.password == ''){
        this.emp.password = this.passHash;
      }
      this.empService.edit(this.emp).subscribe(()=>{
        this.router.navigate(['/admin/employees']);
      })
    }
  }
}
