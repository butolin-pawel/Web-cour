import { Injectable } from '@angular/core';
import { User } from '../Class/user';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  client! : User;
  constructor() { }
  public setClient(cl : User){
    this.client = cl;
  }
  public getClient(){
    return this.client;
  }
}
