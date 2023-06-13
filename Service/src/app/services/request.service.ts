import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../Class/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL = 'http://localhost:8082/'
  }
  createReq(Request : Request){
    return this.http.post(this.URL+'req',Request);
  }
}
