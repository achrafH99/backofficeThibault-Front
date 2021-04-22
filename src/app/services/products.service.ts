import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private authentication: AuthenticationService) {
  }

  public getHeader() {
    return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authentication.tokens.access}`
  }
  }

  public getProducts(): Observable<any> {
    // return this.http.get("./assets/data/products.json");
    return this.http.get("http://localhost:8000/infoproducts", { headers: this.getHeader() });
  }

  public getProduct(id): Observable<any> {
    return this.http.get('http://localhost:8000/infoproduct/' + id, {
      headers: this.getHeader(),
    });

  }

  public getVentes():Observable<any> {
    // return this.http.get("./assets/data/products.json");
    return this.http.get('http://localhost:8000/getVentes', {
      headers: this.getHeader(),
    });
  }

  updateProduct(products: Product[]): Observable<Product> {
    return this.http.put<Product>("http://localhost:8000/putProduct", products, { headers: this.getHeader() })
  }
}
