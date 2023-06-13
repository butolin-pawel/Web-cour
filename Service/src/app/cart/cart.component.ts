import { Component } from '@angular/core';
import { Product } from '../Class/product';
import { CartService } from '../services/cart.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Service } from '../Class/service';
import { delay } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: Product[] = [];
  cartServ : Service[] = [];
  faTrash = faTrash;
  finalCost : number = 0;
  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.cartItems;
    this.cartServ = cartService.cartServ;
    this.cartItems.forEach(element => {
      this.finalCost += (element.cost * element.countinorder);
    });
    this.cartServ.forEach(element => {
      this.finalCost += (element.cost * element.countinorder);
    })
  }
  drop(item :Product){
    this.finalCost -= (item.cost * item.countinorder);
    let df =  this.cartItems.indexOf(item);
    this.cartItems.splice(df,1);
    this.cartService.cartItems = this.cartItems;
    this.cartService.saveCart();

  }
  dropS(item :Service){
    this.finalCost -= (item.cost * item.countinorder);
    let df =  this.cartServ.indexOf(item);
    this.cartServ.splice(df,1);
    this.cartService.cartServ = this.cartServ;
    this.cartService.saveCart();

  }
  recount(){

    this.finalCost = 0;
    this.cartItems.forEach(element => {

      this.finalCost += (element.cost * element.countinorder);
    });
    this.cartServ.forEach(element => {
      this.finalCost += (element.cost * element.countinorder);
    })
    this.cartService.cartServ = this.cartServ;
    this.cartService.cartItems = this.cartItems;
    this.cartService.saveCart();
  }
  show(it :any){
    console.log(it);

  }
}
