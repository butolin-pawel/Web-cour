import { CartProduct } from "./cart-product";
import { CartServ } from "./cart-serv";
import { Radius } from "./radius";
import { Status } from "./status";
import { TypeCar } from "./type";
import { User } from "./user";

export class Request {
  id! : number;
  client! : number;
  clientNavigation! : User;
  stdate! : Date;
  enddate! : Date;
  summ! : number;
  type! : TypeCar;
  radius! : Radius;
  statusNavigation! : Status;
  carTypeNavigation! : TypeCar;
  wheelRadiusNavigation! : Radius;
  cart_services : CartServ[] = [];
  cart_products : CartProduct[] = [];

  info : boolean = false;
  cartServices : CartServ[] = [];
  cartProducts : CartProduct[] = [];
}
