import { Radius } from "./radius";
import { Status } from "./status";
import { TypeCar } from "./type";
import { User } from "./user";

export class Request {
  id! : number;
  client! : number;
  stdate! : Date;
  enddate! : Date;
  summa! : number;
  type! : TypeCar;
  radius! : Radius;
  status! : Status;
}
