import { Component } from '@angular/core';
import { Employee } from '../Class/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employees : Employee[] = [];
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((res) => {
      this.employees = res;
    })
  }
  constructor(private employeeService : EmployeeService){

  }
  remove(emp : Employee){
    this.employeeService.del(emp).subscribe(()=>{
      this.employeeService.getAllEmployees().subscribe((res) => {
        this.employees = res;
      })
    })
  }
}
