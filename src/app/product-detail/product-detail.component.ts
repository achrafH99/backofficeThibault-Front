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
    this.productService
      .updateProduct([this.updatedProduct])
      .subscribe((value) => console.log(value));
  }

  updateQuantity(event): any {
    this.updatedProduct.quantityInStock = parseInt(event);
    console.log(this.updatedProduct);
  }

  updateDiscount(event): any {
    this.updatedProduct.discount = parseInt(event);
    this.updatedProduct.sale = this.updatedProduct.discount > 0;
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
