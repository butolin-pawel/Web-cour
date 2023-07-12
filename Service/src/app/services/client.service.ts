import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Class/user';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL = 'https://localhost:7223/api/Client'
  }
  public getAllClient() : Observable<User[]>{
    return this.http.get<User[]>(this.URL);
  }
  public delClient(id : number){
    return this.http.put(this.URL,id);
  }
  public getClient(phone : string){
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
    return this.http.post<User>(this.URL,{'phone' : phone});
  }
}
