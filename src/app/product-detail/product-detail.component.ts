import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  @Input() productInfo: number;
  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute
  ) {}

  product: Product;
  updatedProduct: Product;
  disabled: Boolean = true;
  modificationQuantity: number;
  modificationDiscount: number;

  ngOnInit(): void {
    // this.router.params.subscribe((value) => {
    //   console.log(value);
    //   console.log(this.product);
    // });
    this.productService.getProduct(this.productInfo).subscribe((val) => {
      this.product = val;
      this.updatedProduct = val;
    });
    // this.product= this.productInfo;
  }

  updateProduct(): any {
    if (
      this.modificationQuantity &&
      this.modificationQuantity !== this.updatedProduct.quantityInStock
    )
      this.updatedProduct.quantityInStock = this.modificationQuantity;
    if (
      this.modificationDiscount &&
      this.modificationDiscount !== this.updatedProduct.discount
    )
      this.updatedProduct.discount = this.modificationDiscount;
    this.productService
      .updateProduct([this.updatedProduct])
      .subscribe((value) => console.log(value));
  }

  updateQuantity(event): any {
    if (event && parseInt(event) >= 0) {
      this.modificationQuantity = parseInt(event);
      this.updatedProduct.action = 'Achat';
      this.disabled = false;
      console.log(this.updatedProduct);
    } else {
      this.modificationQuantity = this.updatedProduct.quantityInStock;
      this.disabled = true;
    }
  }

  updateDiscount(event): any {
    if (event && parseInt(event) >= 0) {
      this.modificationDiscount = parseInt(event);
      this.disabled = false;
      this.updatedProduct.sale = this.updatedProduct.discount > 0;
    } else {
      this.modificationDiscount = this.updatedProduct.discount;
      this.disabled = true;
    }
  }

  getCategory(num: number) {
    switch (num + '') {
      case 'O':
        return 'Poisson';
        break;
      case '1':
        return 'Coquillage';
        break;
      case '2':
        return 'Crustaces';
        break;
      default:
        return 'Poisson';
        break;
    }
  }
}
