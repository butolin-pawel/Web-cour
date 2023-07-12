import { Product } from "./product";
import { ProductRadius } from "./product-radius";

export class CartProduct {
  id! : number;
  request! : number;
  product! : number;
  productradius! : number;
  count! : number;
  cost! : number;
  productNavigation! : Product;

}
