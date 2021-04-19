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

  constructor(private productService: ProductsService) { }

  products: any;

  ngOnInit(): void {
    this.products = this.productService.getProducts().subscribe(product => {
      this.products = product
    });

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );

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

  filteredOptions: Observable<User[]>;
  
  myControl = new FormControl();
  options: User[] = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: 'Igor'}
  ];

  
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


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
