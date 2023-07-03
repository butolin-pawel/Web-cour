import { Component, OnInit , ViewChild, ComponentFactoryResolver, ViewContainerRef  } from '@angular/core';
import { Radius } from '../Class/radius';
import { RadiusService } from '../services/radius.service';
import { TypeCar } from '../Class/type';
import { ServiceService } from '../services/service.service';
import { Service } from '../Class/service';
import { RequestService } from '../services/request.service';
import { Request } from '../Class/request';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../login/login.component';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal'
import { CartServ } from '../Class/cart-serv';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quickly-request',
  templateUrl: './quickly-request.component.html',
  styleUrls: ['./quickly-request.component.css']
})
export class QuicklyRequestComponent implements OnInit {
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;

  radiuces : Radius[] = [];
  tyList :TypeCar[] = [];
  servs : Service[] = [];
  selServ : Service[] = [];
  newReq : Request;
  radid! : number;
  tyid! : number;
  costnum! : number;
  costdisplay = '0 руб.';
  bsModalRef?: BsModalRef;
  today! : string;
  next2weeek! : string;
  constructor(private radiusServ : RadiusService,private router: Router,private servService:ServiceService, private reqService : RequestService, private auth : AuthService, private modalService: BsModalService){
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
    this.servService.getAll().subscribe((res)=>{
      this.servs = res;
    })
  }
  add(item : Service){
    if(this.selServ.includes(item))
    {
    this.selServ.splice(this.selServ.indexOf(item),1);
    }
    else{
      this.selServ.push(item);
    }
    this.costnum = 0;
    this.selServ.forEach((element) =>{

      this.costnum += element.cost;
    });
    this.costdisplay = this.costnum + " руб.";
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
              this.newReq.cart_products =[];
              this.newReq.cart_services = [];
              this.selServ.forEach((element) =>{
                let el = new CartServ();
                el.cost = element.cost;
                el.service = element;
                this.newReq.cart_services.push(el);
              })
              this.reqService.createReq(this.newReq).subscribe(() =>{
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
