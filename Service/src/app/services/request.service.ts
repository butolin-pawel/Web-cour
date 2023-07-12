import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../Class/request';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL = 'https://localhost:7223/api/Request'
  }
  createReq(Request : Request){
    console.log(
     Request.cart_services);
    return this.http.post(this.URL,Request);
  }
  payFor(req : Request){
    return this.http.post(this.URL+'/pay',req.id);
  }
  cancel(req: Request){
    return this.http.put(this.URL+'/cancel',req.id);
  }
  timing(date : Date){
    return this.http.post(this.URL+'/times',date);
  }
  download(req : Request){
    return this.http.post(this.URL+'/report',req,{ responseType: 'blob' });
  }
  futureList() : Observable<Request[]>{
    return this.http.get<Request[]>(this.URL+'/future');
  }
  finishList() : Observable<Request[]>{
    return this.http.get<Request[]>(this.URL+'/finish');
  }
  byClient(id : number){
    return this.http.post<Request[]>(this.URL+'/client',id);
  }
  acceptReq(req : Request){
    return this.http.put(this.URL,req.id);
  }
}
