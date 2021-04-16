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

  updateAll(): any{
    const arr = this.getList().filter(value => value.quantityInStock || value.discount );
    console.log(arr);

    this.productService.updateProduct(arr).subscribe(value => console.log(value))
  }

  getList():any{
    let listProducts = this.products.poissons.concat(this.products.crustaces);
    listProducts = listProducts.concat(this.products.coquillages);
    return listProducts
  }

  updateQuantity(event,id:number):any{
    console.log(event)
    const arr = this.getList().filter(value => value.tigID == id)[0];
    arr.quantityInStock = parseInt(event)
    console.log(this.products)
  }
  updateDiscount(event,id:number):any{
    const arr = this.getList().filter(value => value.tigID == id)[0];
    arr.discount = parseInt(event)
    console.log(this.products)
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
