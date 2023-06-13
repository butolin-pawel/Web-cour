import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Class/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private URL: string;

  constructor(private http: HttpClient) {
    this.URL = 'http://localhost:8082/products'
  }
  goods : Product[] = [];
  public getAll() : Observable<Product[]>{
    return this.http.get<Product[]>(this.URL);
  }
  public getById(id :number) : Observable<Product>{
    return this.http.get<Product>(this.URL+'/'+id);
  }
}
