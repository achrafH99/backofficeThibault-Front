import { JsonpClientBackend } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  disabled = false

  constructor(private productService: ProductsService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDatas();
  }

  getDatas(): any {
    this.productService.getProducts().subscribe(product => {
      this.products.poissons = product.filter(value => value.category == 0);
      this.products.crustaces = product.filter(value => value.category == 2);
      this.products.coquillages = product.filter(value => value.category == 1);

      // const list = JSON.parse(JSON.stringify(this.products))
      const list = JSON.parse(JSON.stringify(product))
      this.request.poissons = []
      list.filter(value => value.category == 0).forEach(element => {
        delete element.quantityInStock;
        this.request.poissons.push(element)
      });
      this.request.crustaces = []
      list.filter(value => value.category == 2).forEach(element => {
        delete element.quantityInStock;
        this.request.crustaces.push(element)
      });
      this.request.coquillages = []
      list.filter(value => value.category == 1).forEach(element => {
        delete element.quantityInStock;
        this.request.coquillages.push(element)
      });
      console.log(this.request);

    });

  }

  getKeys(): any {
    return Object.keys(this.products)
  }

  updateAll(): any {
    const arr = this.getList().filter(value => value.quantityInStock != undefined
      || value.discount != this.getObj(value.tigID).discount);
    console.log(arr);
    this.productService.updateProduct(arr).subscribe(value => {
      this.getDatas();
      this.getSucces();
    })

  }

  getObj(tigId: any): any {
    return this.getProducts().filter(value => value.tigID == tigId)[0]
  }

  getOneProduct(tigId) {
    return this.getList().filter(value => value.tigID == tigId)[0]
  }


  getDiscountPrice(discount: number, price: number): any {
    if (discount > 0) {
      return price - (price * (discount / 100));
    }
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
    console.log(arr)
    if (arr.action == "Vente" || arr.action == "Invendu") {
      this.checkQuantity(this.getObj(arr.tigID).quantityInStock, event)
    }
    else{this.disabled=false}
    if (this.disabled == false) {
      if (!isNaN(event) && event != "") {
        arr.quantityInStock = parseInt(event)

      } else {
        arr.quantityInStock = this.getObj(arr.tigID).quantityInStock
      }
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

  getSucces() {
    this.toastr.success("Data updated", "", {
      tapToDismiss: true
    });
  }

  checkQuantity(stock: string, decrement: string) {
    const stockNumber = parseInt(stock)
    const decrementNumber = parseInt(decrement)
    const total = stockNumber - decrementNumber
    if ((total < 0 || isNaN(total)) && decrementNumber) {
      console.log("negatif", total)
      this.disabled = true
    }
    else {
      console.log("positif ", total)
      this.disabled = false
    }
  }

  handleOperation(event, tigId: number) {

    this.getOneProduct(tigId).action = event.value
  }

}
