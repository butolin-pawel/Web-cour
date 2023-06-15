import { Product } from "./product";
import { ProductRadius } from "./product-radius";

export class CartProduct {
  id! : number;
  request! : number;
  product! : Product;
  productradius! : number;
  count! : number;
  cost! : number;

}
