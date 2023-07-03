import { Component } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Service } from '../Class/service';
import { ServiceService } from '../services/service.service';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-serv-catalog',
  templateUrl: './serv-catalog.component.html',
  styleUrls: ['./serv-catalog.component.css']
})
export class ServCatalogComponent {
  faCartPlus =faCartPlus
  servs : Service[]=[];
  constructor(private serviceService : ServiceService,private cartService: CartService,private toastr: ToastrService){

  }
  ngOnInit(): void {
      this.serviceService.getAll().subscribe((response) =>{
          this.servs = response;
      })
  }

  addToCart(good :Service){
    this.toastr.success('Услуга добавлена в корзину', 'Успешно');
    this.cartService.addToCartS(good,1);
  }

}
