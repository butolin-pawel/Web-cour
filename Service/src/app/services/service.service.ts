import { Injectable } from '@angular/core';
import { Service } from '../Class/service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL = 'http://localhost:8082/services'
  }
  goods : Service[] = [];
  public getAll() : Observable<Service[]>{
    return this.http.get<Service[]>(this.URL);
  }
}
