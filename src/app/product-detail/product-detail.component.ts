import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  constructor(private productService:ProductsService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(value => {
      console.log(value);
      this.productService.getProducts().subscribe(val => { this.product = val.filter(val => val.id == value.id)[0]})
      console.log(this.product);

    });
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
