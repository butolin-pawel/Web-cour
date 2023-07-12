import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { Radius } from '../Class/radius';
import { TypeCar } from '../Class/type';

@Injectable({
  providedIn: 'root'
})
export class RadiusService {
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL = 'https://localhost:7223/api/'
  }
  goods : Radius[] = [];
  public getAllRadius() : Observable<Radius[]>{
    return this.http.get<Radius[]>(this.URL+'radius');
  }
  public getById(id :number) : Observable<Radius>{
    return this.http.get<Radius>(this.URL+'radius/'+id);
  }
  public getAllTypes() : Observable<TypeCar[]>{
    return this.http.get<TypeCar[]>(this.URL+'type');
  }
  public getByIdT(id :number) : Observable<TypeCar>{
    return this.http.get<TypeCar>(this.URL+'type/'+id);
  }
}
