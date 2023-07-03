import { Component } from '@angular/core';
import { Product } from '../Class/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Radius } from '../Class/radius';
import { ProductRadius } from '../Class/product-radius';
import { ToastrService } from 'ngx-toastr';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-good-info',
  templateUrl: './good-info.component.html',
  styleUrls: ['./good-info.component.css',]
})
export class GoodInfoComponent {
  faCartPlus = faCartPlus;
  good : Product;
  count : number = 1 ;
  radiusi : Radius[] = [];
  currRad! : number;
  countes : number[] = [];
  typesRad : ProductRadius[] = [];
  maxCount : number = 1;
  constructor(private productService : ProductService, private route : ActivatedRoute, private cartService :CartService,private toastr: ToastrService){
    this.good = new Product();
      productService.getById(this.route.snapshot.params['id']).subscribe(
        (responce) => {
          this.good = responce;
          this.good.radiuses.forEach((element) =>{
            this.typesRad.push(element);
            this.countes.push(element.count);
             this.radiusi.push(element.radius);
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
    this.toastr.success('Товар добавлен в корзину', 'Успешно');
    this.typesRad.forEach((element)  =>{
      if(element.radius.id == this.currRad){
      good.radius = element;
      }
    })

    this.cartService.addToCart(good,this.count);

  }
  convertJson(jsonstr :string) {

    let harack =  Object.entries(JSON.parse(jsonstr)[0]).map(([key, value]) => ({ key, value }));

     return harack;
 }
}
