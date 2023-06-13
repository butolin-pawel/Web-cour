import { Component } from '@angular/core';
import { Product } from '../Class/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Radius } from '../Class/radius';

@Component({
  selector: 'app-good-info',
  templateUrl: './good-info.component.html',
  styleUrls: ['./good-info.component.css']
})
export class GoodInfoComponent {
  good : Product;
  count : number = 1 ;
  radiusi : Radius[] = [];
  currRad! : number;
  countes : number[] = [];
  maxCount : number = 1;
  constructor(private productService : ProductService, private route : ActivatedRoute, private cartService :CartService){
    this.good = new Product();
      productService.getById(this.route.snapshot.params['id']).subscribe(
        (responce) => {
          this.good = responce;
          this.good.radiuses.forEach((element :JSON) =>{
            this.countes.push(Object.entries(element)[3][1]);
             this.radiusi.push(Object.entries(element)[2][1]);
         });

         this.currRad = this.radiusi[0].id;
         this.maxCount = this.countes[0];
        }
       );
  }
  setMaxCount(){

    this.radiusi.forEach((element)  =>{
      if(element.id == this.currRad){
      this.maxCount = this.countes[this.radiusi.indexOf(element)];
      if(this.count > this.maxCount)
        this.count = this.maxCount;
      }
    })

  }
  addToCart(good :Product){
    this.radiusi.forEach((element)  =>{
      if(element.id == this.currRad){
      good.radius = element.radius;
      good.count = this.maxCount;
      }
    })

    this.cartService.addToCart(good,this.count);
  }
  convertJson(jsonstr :string) {

    let harack =  Object.entries(JSON.parse(jsonstr)[0]).map(([key, value]) => ({ key, value }));

     return harack;
 }
}
