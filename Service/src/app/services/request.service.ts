import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../Class/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL = 'http://localhost:8082/req'
  }
  createReq(Request : Request){
    return this.http.post(this.URL,Request);
  }
  payFor(req : Request){
    return this.http.post(this.URL+'/pay',req);
  }
  cancel(req: Request){
    return this.http.put(this.URL,req);
  }
  timing(date : Date){
    return this.http.post(this.URL+'/times',date);
  }
}
