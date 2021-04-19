import { JsonpClientBackend } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = {
    poissons: [],
    crustaces: [],
    coquillages: []
  };
  request: any = {}

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {

    this.getDatas();
    console.log(this.products)
    console.log(this.request)

  }

  getDatas(): any {
    this.productService.getProducts().subscribe(product => {
      this.products.poissons = product.filter(value => value.category == 0);
      this.products.crustaces = product.filter(value => value.category == 2);
      this.products.coquillages = product.filter(value => value.category == 1);

      // const list = JSON.parse(JSON.stringify(this.products))
      const list = JSON.parse(JSON.stringify(product))
      this.request.poissons = list.filter(value => value.category == 0);
      this.request.crustaces = list.filter(value => value.category == 2);
      this.request.coquillages = list.filter(value => value.category == 1);
    });

  }

  getKeys(): any {
    return Object.keys(this.products)
  }

  updateAll(): any {
    const arr = this.getList().filter(value => value.quantityInStock != this.getObj(value.tigID).quantityInStock
      || value.discount != this.getObj(value.tigID).discount);
    console.log(arr);
    this.productService.updateProduct(arr).subscribe(value => {this.getDatas();
    })
  }

  getObj(tigId: any): any {
    return this.getProducts().filter(value => value.tigID == tigId)[0]
  }

  getList(): any {
    let listProducts = this.request.poissons.concat(this.request.crustaces);
    listProducts = listProducts.concat(this.request.coquillages);
    return listProducts
  }

  getProducts(): any {
    let listProducts = this.products.poissons.concat(this.products.crustaces);
    listProducts = listProducts.concat(this.products.coquillages);
    return listProducts
  }



  updateQuantity(event, id: number): any {
    console.log(event)
    const arr = this.getList().filter(value => value.tigID == id)[0];
    if (!isNaN(event) && event != "") {
      arr.quantityInStock = parseInt(event)

    } else {
      arr.quantityInStock = this.getObj(arr.tigID).quantityInStock
    }

  }
  updateDiscount(event, id: number): any {
    const arr = this.getList().filter(value => value.tigID == id)[0];
    arr.discount = parseInt(event)
    if (!isNaN(event) && event != "") {
      arr.discount = parseInt(event)

    } else {
      arr.discount = this.getObj(arr.tigID).discount
    }
  }

  getCategory(num: number) {
    switch (num + "") {
      case "O":
        return "Poisson";
      case "1":
        return "Coquillage";
      case "2":
        return "Crustaces";
      default:
        return "Poisson";
    }
  }

}
