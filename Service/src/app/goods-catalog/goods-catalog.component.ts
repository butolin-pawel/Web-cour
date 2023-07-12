import { Component, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../Class/product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ProductRadius } from '../Class/product-radius';
import { Options } from 'ng5-slider';
@Component({
  selector: 'app-goods-catalog',
  templateUrl: './goods-catalog.component.html',
  styleUrls: ['./goods-catalog.component.css']
})
export class GoodsCatalogComponent implements OnInit {
  faCartPlus =faCartPlus
  displayGoods : Product[]=[];
  allGoods : Product[] = [];
  makerProd : string = '';
  prodType : string = 'Все';
  diskType : string = 'Все';
  season : string = 'Все';
  spike : string = 'Все';
  profile : string = 'Все';
  minCost : number = 1;
  maxCost : number = 100000;
  sort : string = 'Нет';
  selectedRadius : string = 'Все';
  constructor(private productService : ProductService,private cartService: CartService){

  }
  ngOnInit(): void {
      this.productService.getAll().subscribe((response) =>{
        console.log(response);

        this.allGoods = response;
          this.displayGoods = response;
      })


  }
  showAlert(){
    let alert = new DOMParser().parseFromString('./alert.html',"text/html");
  }
  addToCart(good :Product){
    this.cartService.addToCart(good,1);
  }
  radiuslist(rad : ProductRadius[]){
    let radiuses :string ="";
      rad.forEach((element) =>{
         radiuses += element.radiusNavigation.radius + ' ';
      })
    return radiuses;
  }
  convertJson(jsonstr :string) {

     let harack =  Object.entries(JSON.parse(jsonstr)[0]).map(([key, value]) => ({ key, value }));

      return harack;
  }
  reset(){
    this.displayGoods = this.allGoods;
    this.makerProd ='';
    this.prodType = 'Все';
    this.diskType ='Все';
    this.season = 'Все';
    this.spike = 'Все';
    this.profile = 'Все';
    this.selectedRadius = 'Все';
    this.minCost = 1;
    this.maxCost =100000;
  }
  sorting(){
    switch(this.sort){
      case 'Нет':
        this.filter();
        break;
      case 'возрастание':
        this.displayGoods = this.displayGoods.sort((a,b)=> a.cost - b.cost);
        break;
      case 'убывание':
        this.displayGoods = this.displayGoods.sort((a,b) => b.cost - a.cost);
        break;
    }
  }
  filter(){


    if(this.minCost > this.maxCost){
      let temp = this.maxCost;
      this.maxCost = this.minCost;
      this.minCost = temp;
    }
    this.displayGoods = this.allGoods.filter((product) =>{
      let rad;
      product.productRadii.forEach((elem)=>{
        if(elem.radiusNavigation.radius == this.selectedRadius)
        rad = elem.radiusNavigation.radius;
      })
      if(this.minCost > product.cost || this.maxCost < product.cost)
      return false;
      if(this.makerProd != '' && !product.maker.toLowerCase().includes(this.makerProd.toLowerCase()))
      return false;
      if(this.prodType != 'Все' && product.name != this.prodType)
      return false;
      if(this.diskType != 'Все' && (JSON.parse(product.characters)[0]['Тип'] != this.diskType || product.name == 'Резина'))
      return false;
      if(this.season != 'Все' && (JSON.parse(product.characters)[0]['Сезон'] != this.season || product.name == 'Диск'))
      return false;
      if(this.profile != 'Все' && (JSON.parse(product.characters)[0]['Профиль'] != this.profile || product.name == 'Диск'))
      return false;
      if(this.spike != 'Все' && (JSON.parse(product.characters)[0]['Шипы'] != this.spike || product.name == 'Диск'))
      return false;
      if(this.selectedRadius != 'Все' && !rad)
      return false;
      return true
    })
  }
}

