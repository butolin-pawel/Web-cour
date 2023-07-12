import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
import { ClientService } from '../services/client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newrequest',
  templateUrl: './newrequest.component.html',
  styleUrls: ['./newrequest.component.css']
})
export class NewrequestComponent implements OnInit{

  radiuces : Radius[] = [];
  tyList :TypeCar[] = [];
  servs : Service[] = [];
  selServ : Service[] = [];
  newReq! : Request;
  radid! : number;
  tyid! : number;
  costnum! : number;
  costdisplay = '0 руб.';
  phonenumber : string = '';
  bsModalRef?: BsModalRef;
  today! : string;
  next2weeek! : string;
  constructor(private clserv : ClientService, private radiusServ : RadiusService,private toastr: ToastrService,private router: Router,private servService:ServiceService, private reqService : RequestService, private auth : AuthService, private modalService: BsModalService){





  }
  ngOnInit(): void {
    this.newReq = new Request();

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
    if(this.phonenumber != ''){
        this.clserv.getClient(this.phonenumber).subscribe((res) => {
          this.newReq.client = res.id;
          this.newReq.summ = this.costnum;
          this.radiusServ.getById(this.radid).subscribe((res)=>{
            this.newReq.radius =res;
            this.radiusServ.getByIdT(this.tyid).subscribe((res) =>{
              this.newReq.type = res;
              this.newReq.cart_products =[];
              this.newReq.cart_services = [];
              this.selServ.forEach((element) =>{
                let el = new CartServ();
                el.cost = element.cost;
                el.service = element.id;
                this.newReq.cart_services.push(el);
              })
              this.reqService.createReq(this.newReq).subscribe(() =>{
                this.router.navigate(['/admin']);
              });
            })
          })

        console.log(this.newReq);

        }, (error : any) => {
          this.toastr.error("Пользователь не найден,введите номер телефона ещё раз","Ошибка");
          this.phonenumber = '';
        });
      }
      else{
        this.toastr.warning("Введите номер телефона","Внимание");
      }
      }
      }
