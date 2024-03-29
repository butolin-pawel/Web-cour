import { ProductRadius } from "./product-radius";

export class Product {
  id! : number;
  name! : string;
  maker! : string;
  radius! : ProductRadius;
  height!:string;
  characters! : string;
  cost! : number;
  radiuses! : ProductRadius[];
  countinorder! : number;
}
