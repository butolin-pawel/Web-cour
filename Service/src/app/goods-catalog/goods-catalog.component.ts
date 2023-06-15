import { Component, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../Class/product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ProductRadius } from '../Class/product-radius';
@Component({
  selector: 'app-goods-catalog',
  templateUrl: './goods-catalog.component.html',
  styleUrls: ['./goods-catalog.component.css']
})
export class GoodsCatalogComponent implements OnInit {
  faCartPlus =faCartPlus
  goods : Product[]=[];
  constructor(private productService : ProductService,private cartService: CartService){

  }
  ngOnInit(): void {
      this.productService.getAll().subscribe((response) =>{
          this.goods = response;
      })


  }
  showAlert(){
    let alert = new DOMParser().parseFromString('./alert.html',"text/html");
  }
  addToCart(good :Product){
    this.cartService.addToCart(good,1);
  }
  radiuslist(rad : ProductRadius[]){
    let radiuses :string ="";
      rad.forEach((element) =>{
         radiuses += element.radius.radius + ' ';
      })
    return radiuses;
  }
  convertJson(jsonstr :string) {

     let harack =  Object.entries(JSON.parse(jsonstr)[0]).map(([key, value]) => ({ key, value }));

      return harack;
  }
}

