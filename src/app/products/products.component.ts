import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = {
    poissons : [],
    crustaces : [],
    coquillages : []
  };

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(product => {
    this.products.poissons = product.filter(value => value.category==0);
    this.products.crustaces = product.filter(value => value.category==2);
    this.products.coquillages = product.filter(value => value.category ==1)});
    console.log(this.products)
  }

  getKeys():any{
    return Object.keys(this.products)
  }

  getCategory(num: number){
    switch (num+"") {
      case "O":
        return "Poisson";
        break;
      case "1":
        return "Coquillage";
        break;
      case "2":
        return "Crustaces";
        break;
      default:
        return "Poisson";
        break;
    }
  }

}
