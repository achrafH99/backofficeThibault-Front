import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductsService } from '../services/products.service';
import {map, startWith} from 'rxjs/operators';

export interface User {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchValue : string ;
  keyword = 'name';
  public countries = [

  ];
  productsFilter: any=[];

  constructor(private productService: ProductsService) { }

  products: any;

  ngOnInit(): void {
    this.productService.getProducts().subscribe(product => {
      this.products = product
      this.productsFilter=this.products
      product.forEach(value =>  {
        this.countries.push({"name" : value.name})
      })
      console.log(this.countries)
    });



  }


    selectEvent(event):any{
      this.searchValue=event.name;
      if(Array.isArray(this.productsFilter) && this.productsFilter.length && this.searchValue != ""){
      this.productsFilter = this.products.filter(value => value.name == this.searchValue)
      }
      else{
        this.productsFilter=this.products
      }
    }
  // updateProducts(event):any{
  //   if (event == ""){
  //     this.products = this.productService.getProducts().subscribe(product => {
  //       this.products = product
  //     });
  //   }else{
  //     let arr = this.products.filter(value => value.name.toLocaleLowerCase().includes(event.toLocaleLowerCase()));
  //     this.products = arr
  //     console.log(arr,event)
  //   }
  // }



  getCategory(num:number): string{
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
