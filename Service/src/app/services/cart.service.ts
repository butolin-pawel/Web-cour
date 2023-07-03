import { Injectable } from '@angular/core';
import { Product } from '../Class/product';
import { Service } from '../Class/service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: Product[] = [];
  public cartServ : Service[] = []
  constructor() {
    this.loadCart();
  }

  addToCart(item: Product,count :number) {
    if(!this.cartItems.includes(item)){
      item.countinorder = count;
    this.cartItems.push(item);
    this.saveCart();
    }
    else{
      this.cartItems[this.cartItems.indexOf(item)].countinorder += count;
    }
  }
  addToCartS(item: Service, count :number) {
    if(!this.cartServ.includes(item)){
      item.countinorder = count;
    this.cartServ.push(item);
    this.saveCart();
    }
    else{
      this.cartServ[this.cartServ.indexOf(item)].countinorder += count;
    }
  }
  clearCart() {
    this.cartItems = [];
    this.cartServ = [];
    this.saveCart();
  }

  public saveCart() {
    localStorage.setItem('cartP', JSON.stringify(this.cartItems));
    localStorage.setItem('cartS', JSON.stringify(this.cartServ));
  }

  private loadCart() {
    const cartData = localStorage.getItem('cartP');
    const cartDataS = localStorage.getItem('cartS');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
    if(cartDataS){
      this.cartServ = JSON.parse(cartDataS);
    }
  }
}
