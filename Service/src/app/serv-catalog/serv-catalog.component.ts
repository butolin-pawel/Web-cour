import { Component } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Service } from '../Class/service';
import { ServiceService } from '../services/service.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-serv-catalog',
  templateUrl: './serv-catalog.component.html',
  styleUrls: ['./serv-catalog.component.css']
})
export class ServCatalogComponent {
  faCartPlus =faCartPlus
  servs : Service[]=[];
  constructor(private serviceService : ServiceService,private cartService: CartService){

  }
  ngOnInit(): void {
      this.serviceService.getAll().subscribe((response) =>{
          this.servs = response;
      })
  }

  addToCart(good :Service){
    this.cartService.addToCartS(good,1);
  }

}
