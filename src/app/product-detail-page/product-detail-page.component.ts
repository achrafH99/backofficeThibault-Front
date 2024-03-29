import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/product.model'
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
})
export class ProductDetailPageComponent implements OnInit {
  control = new FormControl();
  constructor(
    private productService: ProductsService,
    private authentication: AuthenticationService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  listProduct: Product[] = [];
  searchResult: Product[] = [];
  result: string = '';
  productDetail: number;
  id: number = 0;
  filteredProduct: Observable<Product[]>;

  @Input() ngValue: any;
  ngOnInit(): void {
    this.productService.getProducts().subscribe((val) => {
      this.listProduct = val;
      this.searchResult = val;
    },
      (error) => {
        this.authentication.tokens = undefined;
        console.log(error);
        this.route.navigate(['/login'])
      });
    this.filteredProduct = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.filteredProduct.subscribe((val) => { (this.searchResult = val) }
    ,
      (error) => {
        this.authentication.tokens = undefined;
        console.log(error);
        this.route.navigate(['/login'])
      });
  }

  setProductValue(product: any) {
    this.productDetail = this.listProduct.filter(
      (val) => val.name === product
    )[0].tigID;
    // this.result = product.target.value;
  }

  handleSubmit() {}

  private _filter(value: string): Product[] {
    const filterValue = this._normalizeValue(value);
    return this.listProduct.filter(
      (prod) =>
        // this._normalizeValue(prod.name).includes(filterValue) // contient substring
        this.contain(filterValue, this._normalizeValue(prod.name)) // commence par substring
    );
  }

  private contain(input: string, product: string) {
    const pattern = new RegExp('^' + input, 'i');
    return pattern.test(product);
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
