import { Injectable } from '@angular/core';
import { Employee } from '../Class/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL = 'https://localhost:7223/api/Employee'
  }
  public getAllEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.URL);
  }
  getById(id : number){
    return this.http.get<Employee>(this.URL+'/'+id);
  }
  save(emp : Employee){
    return this.http.post(this.URL,emp);
  }
  edit(emp : Employee){
    return this.http.put(this.URL,emp);
  }
  del(emp : Employee){
    return this.http.delete(this.URL+'/'+emp.id);
  }
}
