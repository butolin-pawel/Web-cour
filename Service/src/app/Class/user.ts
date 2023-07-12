import { Request } from "./request";

export class User {
  id! : number;
  surname! : string;
  name! :string;
  patronymic! : string;
  dob! : Date;
  phonenumber! : string;
  password! : string;
  email! :string;
  requests! : Request[];

  inTableString = this.surname + ' ' + this.name + ' ' + this.phonenumber;
}
