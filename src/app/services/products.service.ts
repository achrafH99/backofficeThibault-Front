import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }


  public getProducts(): Observable<any> {
    // return this.http.get("./assets/data/products.json");
    return this.http.get("http://localhost:8000/infoproducts");
  }

  public getProduct(id): Observable<any> {
    return this.http.get("http://localhost:8000/infoproduct/" + id);

  }

  public getVentes():Observable<any> {
    // return this.http.get("./assets/data/products.json");
    return this.http.get("http://localhost:8000/getVentes");
  }

  updateProduct(products: Product[]): Observable<Product> {
    return this.http.put<Product>("http://localhost:8000/putProduct", products)
  }
}
