import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }


  public getProducts(): Observable<any> {
    // return this.http.get("./assets/data/products.json");
    return this.http.get("http://localhost:8000/products");
  }

  public getProduct(id): Observable<any>{
    return this.http.get("http://localhost:8000/product/"+id);

  }
}
