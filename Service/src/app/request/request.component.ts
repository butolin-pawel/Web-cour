import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CartServ } from '../Class/cart-serv';
import { Radius } from '../Class/radius';
import { Service } from '../Class/service';
import { TypeCar } from '../Class/type';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { RadiusService } from '../services/radius.service';
import { RequestService } from '../services/request.service';
import { ServiceService } from '../services/service.service';
import { Request } from '../Class/request';
import { CartService } from '../services/cart.service';
import { CartProduct } from '../Class/cart-product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {

  radiuces : Radius[] = [];
  tyList :TypeCar[] = [];
  newReq : Request;
  radid! : number;
  tyid! : number;
  costnum! : number;
  costdisplay = '0 руб.';
  bsModalRef?: BsModalRef;
  today! : string;
  next2weeek! : string;
  constructor(private radiusServ : RadiusService,public cart : CartService,private router: Router,private servService:ServiceService, private reqService : RequestService, private auth : AuthService, private modalService: BsModalService){
    this.newReq = new Request();
  }
  ngOnInit(): void {
    this.today = new Date().toISOString().slice(0, 16);
    this.next2weeek = new Date(new Date().getTime() + (2 * 7 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 16);
    this.radiusServ.getAllRadius().subscribe((responce) =>{
      this.radiuces=responce;
      this.radid = this.radiuces[0].id;
    })
    this.radiusServ.getAllTypes().subscribe((responce) =>{
      this.tyList = responce;
      console.log(this.tyList);

      this.tyid = this.tyList[0].id;
    })
    this.costnum = 0;
    this.cart.cartItems.forEach((elem)=>{
      this.costnum += (elem.cost*elem.countinorder);
    })
    this.cart.cartServ.forEach((elem)=>{
      this.costnum += elem.cost *elem.countinorder
    })
    this.costdisplay = this.costnum.toFixed(2) + "руб."
  }

  createRequest(){
    this.auth.validateToken().subscribe((res) =>{
      if(res)
      {
        this.auth.getUser().subscribe((res) => {
          this.newReq.client = res.id;
          this.newReq.summa = this.costnum;
          this.radiusServ.getById(this.radid).subscribe((res)=>{
            this.newReq.radius =res;
            this.radiusServ.getByIdT(this.tyid).subscribe((res) =>{
              this.newReq.type = res;
              // this.selServ.forEach((element) =>{
              //   let el = new CartServ();
              //   el.cost = element.cost;
              //   el.service = element;
              //   this.newReq.cart_services.push(el);
              // })
              this.newReq.cart_products =[];
              this.newReq.cart_services = [];
              this.cart.cartItems.forEach((element)=>{
                let el = new CartProduct();
                el.cost = element.cost ;
                el.count = element.countinorder;
                el.productradius = element.radius.id;
                el.product = element;
                this.newReq.cart_products.push(el);
              });
              this.cart.cartServ.forEach((element)=>{
                let el = new CartServ();
                el.cost = element.cost;
                el.service = element;
                this.newReq.cart_services.push(el);
              })
              this.reqService.createReq(this.newReq).subscribe(() =>{
                this.cart.clearCart();
                this.router.navigate(['/account']);
              });
            })
          })

        console.log(this.newReq);

        });

      }
      else{
        const modalOptions: ModalOptions = {
          initialState:{},
          class: 'modal-dialog-centered'
        }
        LoginComponent.change();
        this.bsModalRef = this.modalService.show(LoginComponent,modalOptions);
      }

    })

  }
}
